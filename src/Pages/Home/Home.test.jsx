import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../services/apodService", () => ({
  getAllApod: vi.fn(),
}));

import { getAllApod } from "../../services/apodService";

const renderHome = (searchQuery = "") =>
  render(
    <MemoryRouter>
      <Home searchQuery={searchQuery} />
    </MemoryRouter>,
  );

const fakeItems = [
  {
    id: "1",
    title: "Galaxia Andrómeda",
    date: "2024-01-01",
    url: "https://img1.jpg",
  },
  {
    id: "2",
    title: "Nebulosa del Cangrejo",
    date: "2024-01-02",
    url: "https://img2.jpg",
  },
];

describe("Home - hero section", () => {
  it("muestra el título del hero", async () => {
    // Le decimos a la funcion falsa qué debe devolver en este test
    // mockResolvedValue  simula una promesa que resuelve con exito
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    // El hero se renderiza de forma inmediata (no depende de la promesa),
    expect(screen.getByText("home.title")).toBeInTheDocument();
  });

  it("muestra el subtítulo del hero", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    expect(screen.getByText("home.subtitle")).toBeInTheDocument();
  });
});

describe("Home - estado de carga", () => {
  it("muestra el texto de carga mientras espera los datos", () => {
    // new Promise(() => {}) → una promesa que NUNCA resuelve.
    // Simula que la red es lenta o está cargando indefinidamente.
    // Esto nos permite ver el estado "loading" congelado.
    getAllApod.mockReturnValue(new Promise(() => {}));

    renderHome();

    // Como la promesa nunca resuelve, loading sigue siendo true,
    // y el texto 'home.loading' debe estar en pantalla.
    expect(screen.getByText("home.loading")).toBeInTheDocument();
  });

  it("oculta el texto de carga cuando los datos llegan", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    // waitFor espera hasta que la condición se cumpla
    // Lo necesitamos porque getAllApod es async: el loading desaparece recién cuando la promesa resuelve, no de forma inmediata.
    await waitFor(() => {
      expect(screen.queryByText("home.loading")).not.toBeInTheDocument();
    });
    // queryByText devuelve null si no encuentra el elemento, en lugar de tirar error.ideal para verificar que algo NO esta en pantalla.
  });
});

describe("Home - con resultados", () => {
  it("muestra las cards cuando los datos cargan correctamente", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    // Necesitamos waitFor porque los títulos aparecen despues de quela promesa resuelve y el estado se actualiza con setData().
    await waitFor(() => {
      expect(screen.getByText("Galaxia Andrómeda")).toBeInTheDocument();
      expect(screen.getByText("Nebulosa del Cangrejo")).toBeInTheDocument();
    });
  });

  it("muestra la fecha de cada item", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    await waitFor(() => {
      expect(screen.getByText("2024-01-01")).toBeInTheDocument();
      expect(screen.getByText("2024-01-02")).toBeInTheDocument();
    });
  });

  it("NO muestra el mensaje de sin resultados cuando hay datos", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    renderHome();

    await waitFor(() => {
      // queryByText porque estamos buscando algo que NO debería estar.
      expect(screen.queryByText("home.noResults")).not.toBeInTheDocument();
    });
  });
});

describe("Home - sin resultados", () => {
  it("muestra el mensaje de sin resultados cuando el servicio devuelve vacío", async () => {
    // Array vacío → simula que la API no encontró nada (búsqueda sin resultados).
    // Esto dispara el setHasMore(false) y el data queda en [].
    getAllApod.mockResolvedValue([]);

    renderHome();

    await waitFor(() => {
      expect(screen.getByText("home.noResults")).toBeInTheDocument();
    });
  });

  it("NO muestra cards cuando no hay resultados", async () => {
    getAllApod.mockResolvedValue([]);

    renderHome();

    await waitFor(() => {
      expect(screen.queryByText("Galaxia Andrómeda")).not.toBeInTheDocument();
    });
  });
});

describe("Home - búsqueda", () => {
  it("llama al servicio con la searchQuery recibida", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    // Le pasamos una prop de búsqueda para verificar que llega al servicio.
    renderHome("nebulosa");

    await waitFor(() => {
      // toHaveBeenCalledWith → verifica con qué argumentos fue llamada la función falsa.
      // page=1 porque es el primer render, count=10 porque así está en el componente.
      expect(getAllApod).toHaveBeenCalledWith(1, 10, "nebulosa");
    });
  });

  it("llama al servicio desde la página 1 al montar", async () => {
    getAllApod.mockResolvedValue(fakeItems);

    // Sin searchQuery → debe llamarse con string vacío (valor por defecto del helper).
    renderHome();

    await waitFor(() => {
      expect(getAllApod).toHaveBeenCalledWith(1, 10, "");
    });
  });
});

describe("Home - manejo de errores", () => {
  it("oculta el loading si el servicio falla", async () => {
    // mockRejectedValue → simula que la promesa rechaza 
    // El catch del componente llama a setLoading(false), así que el loading
    // debe desaparecer aunque no haya datos.
    getAllApod.mockRejectedValue(new Error("Network error"));

    renderHome();

    await waitFor(() => {
      expect(screen.queryByText("home.loading")).not.toBeInTheDocument();
    });
  });
});
