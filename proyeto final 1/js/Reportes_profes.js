const reportsBody = document.getElementById('reportsBody');
const noDataP = document.getElementById('noData');
const clearBtn = document.getElementById('clearBtn');

if (!localStorage.getItem('reports')) {
  localStorage.setItem('reports', JSON.stringify([
    {
      studentName: 'Mateo Sámano',
      controlNumber: '23316061200464',
      date: '2025-06-01',
      type: 'reporte',
      description: 'No entregó tarea por enfermedad.'
    },
    {
      studentName: 'Sebastián Gómez',
      controlNumber: '2331606061200447',
      date: '2025-06-02',
      type: 'justificante',
      description: 'Falta justificada por cita médica.'
    }
  ]));
}

function renderReports() {
  let reports = JSON.parse(localStorage.getItem('reports')) || [];
  reportsBody.innerHTML = '';
  if (reports.length === 0) {
    noDataP.style.display = 'block';
    clearBtn.style.display = 'none';
    return;
  }

  noDataP.style.display = 'none';
  clearBtn.style.display = 'block';

  reports.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Alumno">${escapeHtml(r.studentName)}</td>
      <td data-label="Control">${escapeHtml(r.controlNumber)}</td>
      <td data-label="Fecha">${formatDate(r.date)}</td>
      <td data-label="Tipo">${capitalize(r.type)}</td>
      <td data-label="Descripción">${escapeHtml(r.description)}</td>
    `;
    reportsBody.appendChild(tr);
  });
}

function formatDate(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-');
  return `${d}/${m}/${y}`;
}

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}

clearBtn.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres eliminar todo el historial? Esta acción no se puede deshacer.')) {
    localStorage.removeItem('reports');
    renderReports();
  }
});

renderReports();


   // Animación para los botones
   document.querySelectorAll('.botones a button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.querySelector('span').style.animation = 'float 1s infinite ease-in-out';
    });
    
    button.addEventListener('mouseout', function() {
        this.querySelector('span').style.animation = 'none';
    });
});