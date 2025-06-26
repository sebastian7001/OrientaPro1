document.addEventListener('DOMContentLoaded', () => {
    const reportSelect = document.getElementById('reportSelect');
    const reportDetails = document.getElementById('reportDetails');
    const sendWhatsapp = document.getElementById('sendWhatsapp');
    const sendEmail = document.getElementById('sendEmail');
  
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
  
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
  
    function formatDate(str) {
      if (!str) return '';
      const [y, m, d] = str.split('-');
      return `${d}/${m}/${y}`;
    }
  
    function capitalize(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  
    function populateSelect() {
      if (reports.length === 0) {
        reportSelect.innerHTML = '<option value="" disabled selected>No hay reportes guardados</option>';
        sendWhatsapp.disabled = true;
        sendEmail.disabled = true;
        reportDetails.style.display = 'none';
        return;
      }
  
      reportSelect.innerHTML = '<option value="" disabled selected>-- Selecciona un reporte --</option>';
      reports.forEach(r => {
        const option = document.createElement('option');
        option.value = r.id;
        option.textContent = `${capitalize(r.type)} - ${r.studentName} (${formatDate(r.date)})`;
        reportSelect.appendChild(option);
      });
  
      sendWhatsapp.disabled = true;
      sendEmail.disabled = true;
      reportDetails.style.display = 'none';
    }
  
    function getReportById(id) {
      return reports.find(r => r.id === id);
    }
  
    function getWhatsappUrl(message, phone = '') {
      let url = 'https://wa.me/';
      if (phone) url += phone;
      url += `?text=${encodeURIComponent(message)}`;
      return url;
    }
  
    function getMailtoUrl(to, subject, body) {
      return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  
    reportSelect.addEventListener('change', () => {
      const selectedId = reportSelect.value;
      if (!selectedId) return;
      const rpt = getReportById(selectedId);
      if (!rpt) return;
  
      const message =
  `Hola,
  
  Te comparto el/la ${capitalize(rpt.type)} correspondiente al alumno(a) ${rpt.studentName} (Control: ${rpt.controlNumber}).
  
  Fecha: ${formatDate(rpt.date)}
  
  Descripción:
  ${rpt.description}
  
  Saludos,
  Equipo de Orientación Escolar`;
  
      reportDetails.textContent = message;
      reportDetails.style.display = 'block';
      sendWhatsapp.disabled = false;
      sendEmail.disabled = false;
  
      sendWhatsapp.dataset.message = message;
      sendEmail.dataset.subject = `Envío de ${capitalize(rpt.type)} - ${rpt.studentName}`;
      sendEmail.dataset.body = message;
    });
  
    sendWhatsapp.addEventListener('click', () => {
      const message = sendWhatsapp.dataset.message;
      if (!message) return;
      const url = getWhatsappUrl(message);
      window.open(url, '_blank');
    });
  
    sendEmail.addEventListener('click', () => {
      const subject = sendEmail.dataset.subject;
      const body = sendEmail.dataset.body;
      if (!body) return;
      const url = getMailtoUrl('', subject, body);
      window.location.href = url;
    });
  
    populateSelect();
  });