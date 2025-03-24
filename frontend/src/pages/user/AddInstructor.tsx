import React, { useEffect, useState } from 'react';
import TextField from '../../components/commons/TextField';
import axiosJWT from '../../config/axiosJWTConfig';
import { toast, Toaster } from 'sonner';

const AddInstructor = () => {
    const [lastName, setUsername] = useState("")
    const [firstName, setPassword] = useState("")
    const [salary, setSalary] = useState("")
    const [gender, setGender] = useState(true)

    const handleUsename = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handlePassoword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.value)
    }
    const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(!gender)
    }

    useEffect(() => {
      
    })
  const hanldeButton = () => {
    const handleAdd = async () => {
        const response = await axiosJWT.post("http://localhost:8080/instructor", { lastName:lastName, firstName:firstName, salary:salary, gender })
        console.log("Thêm mới thành công " + response);
        toast.success("Thêm mới thành công")
    }

    handleAdd()

  }
    return (
     <>
            <div>
                <TextField type='text' label='lastName' name='' value={lastName} onChange={handleUsename} />
                <TextField type='text' label='firstName' name='' value={firstName} onChange={handlePassoword} />
                <TextField type='text' label='salary' name='' value={salary} onChange={handleSalary} />
                <TextField type='checked' label='gender' name=''onChange={handleGender} />
                <button onClick={hanldeButton}>Thêm mới</button>
            </div>
            <Toaster richColors position='top-center'/>
     </>
    );
}

export default AddInstructor;
