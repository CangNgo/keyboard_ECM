import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
interface Student {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
}

function File() {
  const [data, setData] = useState<Student[]>([]);

  const handleFileimport = (e: React.ChangeEvent<HTMLInputElement>) => {
    //lấy file đã được chọn
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.log("Vui lòng chọn file");
      return;
    }

    //lấy phần tử đầu
    const file = files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;
      const workBook = XLSX.read(data, { type: "binary" });
      const sheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[sheetName];
      const workSheet = XLSX.utils.sheet_to_json(sheet) as Student[];

      setData(workSheet);
      console.log(workSheet);
    };

    reader.readAsBinaryString(file);
  };

  //import 
  const handleSaveFile = async () => {
    try {
      console.log(data);

      const response = await axios.post(
        "http://localhost:8081/api/student",
        data
      );
      console.log(JSON.stringify(response.data));
    } catch (err) {
      console.log("Lỗi khi gửi dữ liệu", err);
    }
  };

  //export 
  const handleExportFile = async () => {
    try {
      // Lấy dữ liệu từ backend
      const response = await axios.get(
        "http://localhost:8081/api/student"
      );

      // Kiểm tra và lấy dữ liệu sinh viên
      const students: Student[] = response.data;

      if (students.length === 0) {
        alert("Không có dữ liệu để xuất");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(students);
      console.log("jon", worksheet);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      XLSX.writeFile(workbook, "student_list.xlsx", {
        bookType: "xlsx",
        type: "binary"
      });

    } catch (err) {
      console.error("Lỗi khi export file", err);
      alert("Không thể export file");
    }
  };

  return (
    <div>
      <label htmlFor="file-Student">Import Excel file</label>
      <input
        type="file"
        name="file-Student"
        id="file-Student"
        accept=".xlsx, .xls" // Chỉ chấp nhận file Excel
        onChange={handleFileimport}
      />

      <button onClick={handleSaveFile}>Lưu file </button>
      <button onClick={handleExportFile}>Export</button>

    </div>

  );
}

export default File;
