import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import { saveAs } from 'file-saver';

export async function saveDocument(data, name) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Заголовок документа",
                bold: true,
                size: 48,
              }),
            ],
            heading: "TITLE",
          }),
          new Table({
            rows: data.map(line =>
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(line)],
                  }),
                ],
              })
            ),
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, name);
}