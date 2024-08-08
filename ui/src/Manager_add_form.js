import { useState } from 'react';

const addServer = 'http://localhost:5080/post';

function ManagerAdd() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(addServer, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputs.item_name,
          description: inputs.item_description,
          username: inputs.username,
          quantity: inputs.quantity,
        }),
      });

      const result = await response.json();
      console.log(result);
      // You can handle the response here or show a success message
    } catch (error) {
      console.error(error);
      // You can handle the error here or show an error message
    }
  }

  return (
    <div>
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input 
            type="text" 
            name="item_name" 
            value={inputs.item_name || ""} 
            onChange={handleChange}
          />
        </label>
        <label>
          Item Description:
          <input 
            type="text" 
            name="item_description" 
            value={inputs.item_description || ""} 
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your username:
          <input 
            type="text" 
            name="username" 
            value={inputs.username || ""} 
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input 
            type="number" 
            name="quantity" 
            value={inputs.quantity || ""} 
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManagerAdd;






// import { useState } from 'react';


// const addServer = 'http://localhost:5080/post';


// function ManagerAdd() {
//   const [inputs, setInputs] = useState({});

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs(values => ({...values, [name]: value}))
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const response = await fetch(addServer, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: item_name,
//           description: item_description,
//           username: username,
//           quantity: quantity,
//         }),
//       })
//         .then(res => res.json())
//         .then(res => {
//           console.log(res);
//           return res;
//         })
//         .catch(error => {
//           console.log(error);
//           return { message: 'Error Connecting to the Server' };
//         });
    
//       return response;
//   }

//   return (
//         <div>
//             <h1> Add New Item</h1>
//             <form onSubmit={handleSubmit}>
//             <label>Item Name:
//             <input 
//                 type="text" 
//                 name="item_name" 
//                 value={inputs.item_name || ""} 
//                 onChange={handleChange}
//             />
//             </label>
//             <label>Item Description:
//             <input 
//                 type="text" 
//                 name="item_description" 
//                 value={inputs.item_description || ""} 
//                 onChange={handleChange}
//             />
//             </label>
//             <label>Enter your username:
//             <input 
//                 type="text" 
//                 name="username" 
//                 value={inputs.username || ""} 
//                 onChange={handleChange}
//             />
//             </label>
//             <label>Quantity:
//                 <input 
//                 type="number" 
//                 name="quantity" 
//                 value={inputs.quantity || ""} 
//                 onChange={handleChange}
//                 />
//                 </label>
//                 <input type="submit" />
//             </form>
//         </div>
//   )

// }

// export default ManagerAdd;