import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Statistics from '../components/Statistics';
import '@testing-library/jest-dom';

// Simular la API global
beforeEach(() => {
  window.api = {
    statistics: jest.fn()
  };
});

describe('Statistics component', () => {

  test('renderiza datos correctamente en la tabla', async () => {
    // Simular respuesta exitosa
    const mockIncidents = [
      { id: 1, tipo: 'Robo', descripcion: 'Robo de celular', fecha: '2023-01-01' },
      { id: 2, tipo: 'Acoso', descripcion: 'Acoso callejero', fecha: '2023-01-02' }
    ];
    window.api.statistics.mockResolvedValue(mockIncidents);

    render(<Statistics />);

    // Esperar a que se renderice la tabla
    await waitFor(() => {
      expect(screen.getByText('Robo')).toBeInTheDocument();
      expect(screen.getByText('Acoso')).toBeInTheDocument();
    });

    // Verificar columnas adicionales
    expect(screen.getByText('Robo de celular')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  test('muestra mensaje de error si falla la API', async () => {
    window.api.statistics.mockRejectedValue(new Error('Falla de red'));

    render(<Statistics />);

    await waitFor(() => {
      expect(screen.getByText(/Error al cargar estadísticas/i)).toBeInTheDocument();
    });
  });

  test('renderiza tabla vacía si no hay incidentes', async () => {
    window.api.statistics.mockResolvedValue([]);

    render(<Statistics />);

    await waitFor(() => {
      expect(screen.queryByText(/No hay datos disponibles/i)).toBeInTheDocument();
    });
  });

});
