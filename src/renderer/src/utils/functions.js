import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { Roboto } from './roboto.js';
import { RobotoBold } from "./robot-bold.js";

export async function pdfDoc(title) {
  const doc = new jsPDF();

  doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
  doc.addFileToVFS("Roboto-Bold.ttf", RobotoBold);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  doc.setFont("Roboto");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(20);

  const textWidth = 180;
  const lines = doc.splitTextToSize(title, textWidth);

  const textHeight = doc.getTextDimensions(lines).h;

  const x = pageWidth / 2;
  const y = (pageHeight - textHeight) / 2 + textHeight / 2;

  doc.setFont("Roboto", "bold");

  doc.text(lines, x, y, { align: 'center' });

  return doc;
}

export async function downloadTest1({ data, organizationName, asuName, result }) {
  const doc = await pdfDoc(`Результат проведения аудита информационной безопасности АСУ “${asuName}” в ${organizationName} с использованием программного обеспечения “ИнфоБезАудит” по методике оценки показателя состояния технической защиты информации и обеспечения безопасности значимых объектов критической информационной инфраструктуры Российской Федерации утвержденной ФСТЭК РФ 02 мая 2024 года.`);

  if (data.length) {
    doc.addPage();

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);

    const textWidth = 180;
    const lines = doc.splitTextToSize(`По результатам проведенного аудита на соответствие критериям Информационной Безопасности согласно методике оценки показателя состояния технической защиты информации и обеспечения безопасности значимых объектов критической информационной инфраструктуры Российской Федерации утвержденной ФСТЭК РФ 02 мая 2024 года сделан следующий вывод: ${result}`, textWidth);

    const x = pageWidth / 2;

    doc.text(lines, x, 10, { align: 'center' });

    const head = [['Номер', 'Название']];

    doc.autoTable({
      head: head,
      body: data.map((item, itemIndex) => ([itemIndex + 1, item])),
      startY: 100,
      styles: { font: "Roboto" },
    });
  }

  doc.save(`Результат проведения аудита информационной безопасности АСУ “${asuName}”.pdf`);
}

export async function downloadTest2({ data, organizationName, asuName, result }) {
  const doc = await pdfDoc(`Результат проведения аудита информационной безопасности АСУ “${asuName}” в ${organizationName} с использованием программного обеспечения “ИнфоБезАудит” на соответствие требованиям к обеспечению защиты информации в автоматизированных системах управления производственными и технологическими процессами согласно приказу ФСТЭК №31 от 14 марта 2014 г.`);

  doc.addPage();

  doc.setFontSize(14);

  const textWidth = 180;
  const lines = doc.splitTextToSize("        " + result, textWidth);

  doc.text(lines, 10, 20);

  if (data.length) {
    doc.text("        " + "Необходимо реализовать следующие меры, указанные в таблице ниже.", 10, 55);

    const head = [['Номер', 'Название']];

    doc.autoTable({
      head: head,
      body: data.map((item, itemIndex) => ([itemIndex + 1, item])),
      startY: 70,
      styles: { font: "Roboto" },
    });
  }

  doc.save(`Результат проведения аудита информационной безопасности АСУ “${asuName}”.pdf`);
}
