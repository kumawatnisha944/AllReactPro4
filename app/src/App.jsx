import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
import { BASE_URL } from "./config";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  /* ✅ SINGLE API CALL */
 useEffect(() => {
  const fetchFoodData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/foods`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await response.json();
      setData(json);
      setFilteredData(json);
    } catch (err) {
      setError("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  fetchFoodData();
}, []);

  /* ✅ SEARCH */
  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const filter = data.filter((food) =>
      food.name.toLowerCase().includes(searchValue)
    );

    setFilteredData(filter);
  };

  /* ✅ FILTER BUTTONS */
  const filterFood = (type) => {
    setSelectedBtn(type);

    if (type === "all") {
      setFilteredData(data);
      return;
    }

    const filter = data.filter(
      (food) => food.type.toLowerCase() === type.toLowerCase()
    );

    setFilteredData(filter);
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food..." />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              key={value.type}
              $isSelected={selectedBtn === value.type}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

/* ================= styled-components ================= */

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input {
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;

    &::placeholder {
      color: white;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "#f22f2f" : "#ff4343"};

  outline: 1px solid
    ${(props) => (props.$isSelected ? "white" : "#ff4343")};

  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f22f2f;
  }
`;











// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import SearchResult from "./components/SearchResults/SearchResult";

// import { BASE_URL } from "./config";



// const App = () => {
//   const [data,setData]=useState();
//   const [filteredData,setFilteredData]=useState();
//   const [loading,setLoading]=useState(false);
//   const [error,setError]=useState(null);
//   const [selectedBtn,setSelectedBtn]=useState("all");


//   useEffect(() => {
//   fetch(BASE_URL)
//     .then((res) => res.json())
//     .then((data) => setData(data))
//     .catch(() => setError("Unable to fetch data"));
// }, []);


//   useEffect(()=>{
//     const fetchFoodData= async() =>{
//     setLoading(true);
//    try{
//     const response=await fetch(BASE_URL);
//     const json=await response.json();

//     setData(json);
//     setFilteredData(json);
//     setLoading(false);
//    }catch(error){
//     setError("Unable to fetch data");
//     setLoading(false);
//    }
//   };
//    fetchFoodData();
//   }, []);

//   console.log(data);

//   const searchFood=(e)=>{
//     const searchValue=e.target.value;

//     console.log(searchValue);
//     if(searchValue == ""){
//       setFilteredData(null);
//     }

//     const filter = data?.filter((food) => 
//       food.name.toLowerCase().includes(searchValue.toLowerCase())
//   );
//   setFilteredData(filter);
//   };

//   const filterFood = (type) =>{
//     if(type == "all"){
//       setFilteredData(data);
//       setSelectedBtn("all");
//       return;
//     }

//     const filter = data?.filter((food) => 
//       food.type.toLowerCase().includes(type.toLowerCase())
//   );
//         setFilteredData(filter);
//       setSelectedBtn(type);
//   };
  
//   const filterBtns =[
//     {
//       name:"All",
//       type:"all",
//     },
//     {
//       name:"Breakfast",
//       type:"breakfast",
//     },
//     {
//       name:"Lunch",
//       type:"lunch",
//     },
//     {
//       name:"Dinner",
//       type:"dinner",
//     },
//   ]
  

//   if(error) return <div>{error}</div>;
//   if(loading) return <div>loading...</div>;
  
//   return (
//    <>
//      <Container>
//       <TopContainer>
//         <div className="logo">
//           <img src="/logo.png" alt="logo" />
//         </div>
//         <div className="search">
//           <input onChange={searchFood}  placeholder="Search Food..."/>
//         </div>
//       </TopContainer>

//       <FilterContainer>
//       {
//         filterBtns.map((value)=>(
//           <Button 
//           isSelected={selectedBtn == value.type}
//           key={value.name} onClick={() => filterFood(value.type)}>
//             {value.name}
//           </Button>

//         ))
//       }
//       </FilterContainer>
//     </Container>

//     <SearchResult data={filteredData}/>
//    </>
//   );
// };

// export default App;

// export const Container=styled.div`
// max-width:1200px;
// margin:0 auto;
// `;

// const TopContainer=styled.section`
// height:140px;
// display:flex;
// justify-content:space-between;
// padding:16px;
// align-items:center;

// .search{
// input{
//   background-color:transparent;
//   border:1px solid red;
//   color:white;
//   border-radius:5px;
//   height:40px;
//   font-size:16px;
//   padding:0 10px;
//   &::placeholder{color:white;}
// }
// }

// @media (0< width < 600px ){
// flex-direction:column;
// height:120px;
// }
// `;

// const FilterContainer=styled.section`
// display:flex;
// justify-content:center;
// gap:12px;
// padding-bottom:40px;
// `;

// export const Button = styled.button`
//   background-color: ${(props) =>
//     props.$isSelected ? "#f22f2f" : "#ff4343"};
  
//   outline: 1px solid
//     ${(props) => (props.$isSelected ? "white" : "#ff4343")};

//   border-radius: 5px;
//   padding: 6px 12px;
//   border: none;
//   color: white;
//   cursor: pointer;

//   &:hover {
//     background-color: #f22f2f;
//   }
// `;
// <Button $isSelected={true}>All</Button>

