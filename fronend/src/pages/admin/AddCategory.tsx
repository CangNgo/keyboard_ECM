import React, { useEffect, useState } from "react";
import TextField from './../../components/commons/TextField';
import SelectBox from "../../components/commons/SelectBox";
import Button from "../../components/commons/Button";
import { addCategory, findAllCategory } from "../../apis/categoryAPI";
import { addCategoryDTO, category } from "../../types/categoryTypes";

function AddCategory() {

  const [categoryName, setCategoryName] = useState('')
  const [categoryStatus, setCategoryStatus] = useState('Trạng thái')
  const [description, setCategoryDescription] = useState('')
  const [category, setCategory] = useState<category[]>([])
  const [checkAddCategory, setCheckAddCategory] = useState(false)

  const options = [
    {
      label: "ACTION",
      value: "ACTIVE"
    },
    {
      label: "NO_ACTION",
      value: "NO_ACTIVE"
    }
  ]

  const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setCategoryName(name)
  }
  const handleCategoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value
    setCategoryDescription(description)
  }

  const handleChangStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setCategoryStatus(status)
  }
  const handleAddCategory = async () => {
    const categoryDTO: addCategoryDTO = {
      name: categoryName,
      status: categoryStatus,
      isDeleted: false,
      description: description,
    };

    try {
      const response = await addCategory(categoryDTO); // Đợi kết quả từ API
      if (response) {
        console.log("Thêm thành công:", response);

        // Reset form khi thành công
        setCategoryName("");
        setCategoryDescription("");
        setCategoryStatus("Trạng thái");
        setCheckAddCategory(!checkAddCategory)
      }
    } catch (error) {
      console.error("Lỗi khi thêm loại sản phẩm:", error);
      // Bạn có thể hiển thị thông báo lỗi ở đây
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await findAllCategory(); // Đợi kết quả trả về từ API
        console.log("find all category", result.data);

        setCategory(result.data)
        // Xử lý dữ liệu (nếu cần)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData(); // Gọi hàm async bên trong useEffect

  }, [checkAddCategory])

  return <div className="flex">
    <div className="w-1/2">
      <TextField
        value={categoryName}
        type="text"
        placeholder="Tên loại sản phẩm"
        label="Loại sản phẩm"
        onChange={(e) => { handleCategoryName(e) }}
      />
      <TextField
        value={categoryStatus} label="Trạng thái">
        <SelectBox
          options={options}
          defaultOptionValue={categoryStatus} name="status"
          onChange={(e) => handleChangStatus(e)}
        >
        </SelectBox>
      </TextField>
      <TextField
        value={description}
        type="text"
        placeholder="Mô tả"
        label="Mô tả"
        onChange={(e) => { handleCategoryDescription(e) }}
      />
      <Button className="bg-blue-400 hover:bg-blue-500 float-right" onClick={handleAddCategory}>Thêm loại sản phẩm</Button>
    </div>
    <div className="w-1/2 ml-4">
      <table className="table-fixed w-full text-left">
        <thead>
          <tr>
            <th className="w-1/3">Tên</th>
            <th className="w-1/3">Trạng thái</th>
            <th className="w-1/3">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.status==="ACTIVE"?"Đang bán":"Đã ngừng"}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>;
}

export default AddCategory;
