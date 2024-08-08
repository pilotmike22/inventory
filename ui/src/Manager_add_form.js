import { useState } from 'react';



function ManagerAdd() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
        <div>
            <h1> Add New Item</h1>
            <form onSubmit={handleSubmit}>
            <label>Item Name:
            <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
            </label>
            <label>Item Description:
            <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
            </label>
            <label>Enter your username:
            <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
            </label>
            <label>Quantity:
                <input 
                type="number" 
                name="age" 
                value={inputs.age || ""} 
                onChange={handleChange}
                />
                </label>
                <input type="submit" />
            </form>
        </div>
  )
}

export default ManagerAdd;



// const ManagerAdd = () => {
//     return(

//         <div>
//             <h1> Add New Item</h1>
//             <form>
//                 <label>
//                     Item Name:
//                     <input type="text" name="name" />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>

//         </div>
//     )
    
//     };
    
//     export default ManagerAdd;