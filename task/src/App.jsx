import { useEffect,useMemo,useState } from 'react';
import './App.scss';
import { Slider } from 'antd';
function App() {
  const [data, setData] = useState([])
  const [grid, setgrid] = useState(2)
  const [current, setcurrent] = useState(1)
  const [pageperdata] = useState(4)
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0,150])
 

  const pagenum=[]
  for (let i = 1; i <=Math.ceil(filteredData.length/pageperdata); i++) {
    
    pagenum.push(i)
  }
  const lastelement=current*pageperdata
  const firstelement=lastelement-pageperdata
  const pagedatas=useMemo(()=>filteredData.slice(firstelement,lastelement),[filteredData,current])
  const filterResult = (category) => {
    const filtered = data.filter((item) => item.category === category);
    setFilteredData(filtered);
  };

  const filterByClothesSize = (size) => {
    const filtered = data.filter((item) => item.size === size);
    setFilteredData(filtered);
  };

  const filterByShoesSize = (size) => {
    const filtered = data.filter((item) => item.size === size);
    setFilteredData(filtered);
  };

  const filterByColor = (color) => {
    const filtered = data.filter((item) => item.color === color);
    setFilteredData(filtered);
  };

  const filterByBrand = (brand) => {
    const filtered = data.filter((item) => item.brand === brand);
    setFilteredData(filtered);
  };
  const filterPrice = () => {
    const filtered = data.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1]);
    setFilteredData(filtered);
  };
  const sortData = (sortingOption) => {
    let sortedData = [...data]; 
  
    switch (sortingOption) {
      case "A-Z":
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
        case "price-low-to-high":
          sortedData.sort((a, b) => a.price - b.price);
          break;
          default:
            sortedData = [...data];
            break;
    }
  
    
    setFilteredData(sortedData);
  };
  function handleClearFilters() {
    setFilteredData(data)
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  }

  function handlegrid3() {
    setgrid(3)
  }
  function handlegrid4() {
    setgrid(4)
  }
  function handlegrid2() {
    setgrid(2)
  }
  const handlePriceChange =(value)=>{
    setPriceRange(value)
    filterPrice()
  }
  useEffect(()=>{
    const fetchdata =async function () {
      const res=await fetch('http://localhost:3000/products')
      const jsondata=await res.json()
      setData(jsondata)
      setFilteredData(jsondata);
    }
    fetchdata()
},[])
  return (
   <>
   <div className='products'>
   <div className='left_side'>
    <div className='clear_all'>
      <p>Filters:</p>
      <button onClick={()=>handleClearFilters()}>Clear All</button>
    </div>
<div className='category'>
  <h3>Category</h3>
  
{/* <input type="checkbox" name="women" id="women" checked={data.includes('women')} onChange={(e)=>{if (e.target.checked) {
  filterResult('women')
}
else{
setFilteredData(data)
}
}}/>


<p>Women</p> */}
<div className='input'>
<input type="checkbox" name="women" id="women" onChange={(e)=>{if (e.target.checked) {
  filterResult('women')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="women">Women</label>
</div>

 
  <div className='input'>
  <input type="checkbox" name="bag" id="bag" onChange={(e)=>{if (e.target.checked) {
  filterResult('bag')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="bag">Bags</label>
  </div>
  <div className='input'>
  <input type="checkbox" name="jacket" id="jacket" onChange={(e)=>{if (e.target.checked) {
  filterResult('jacket')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="jacket">Jackets</label>
  </div>
<div className='input'>
<input type="checkbox" name="dress" id="dress" onChange={(e)=>{if (e.target.checked) {
  filterResult('dress')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="dress">Dresses</label>
</div>
<div className='input'>
<input type="checkbox" name="shoes" id="shoes" onChange={(e)=>{if (e.target.checked) {
  filterResult('shoes')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="shoes">Shoes</label>
</div>

<div className='input'>
<input type="checkbox" name="jumpers" id="jumpers" onChange={(e)=>{if (e.target.checked) {
  filterResult('jumpers')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="jumpers">Jumpers</label>
</div>
  {/* <button onClick={()=>filterResult('bag')}>bags</button> */}
  {/* <button onClick={()=>filterResult('jacket')}>jackets</button> */}
  {/* <button onClick={()=>filterResult('dress')}>dresses</button>
  <button onClick={()=>filterResult('shoes')}>shoes</button>
  <button onClick={()=>filterResult('jumpers')}>jumpers</button> */}
</div>
<div className='clothes_size'>
<h3>Clothes Size</h3>
  {/* <button onClick={()=>filterByClothesSize('m')}>M</button> */}
 <div className='input'>
 <input type="checkbox" name="m" id="m" onChange={(e)=>{if (e.target.checked) {
  filterByClothesSize('m')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="m">M</label>
 </div>
  {/* <button onClick={()=>filterByClothesSize('s')}>S</button> */}
  <div className='input'>
  <input type="checkbox" name="s" id="s" onChange={(e)=>{if (e.target.checked) {
  filterByClothesSize('s')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="s">S</label>
  </div>
  <div className='input'>
  <input type="checkbox" name="l" id="l" onChange={(e)=>{if (e.target.checked) {
  filterByClothesSize('l')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="l">L</label>
  </div>
  {/* <button onClick={()=>filterByClothesSize('l')}>L</button> */}
 
  {/* <button onClick={()=>filterByClothesSize('xl')}>XL</button> */}
  <div className='input'>
  <input type="checkbox" name="xl" id="xl" onChange={(e)=>{if (e.target.checked) {
  filterByClothesSize('xl')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="xl">XL</label>
  </div>
</div>
<div className='shoes_size'>
<h3>Shoes Size</h3>
  {/* <button onClick={()=>filterByShoesSize('36.5')}>36.5</button> */}
 <div className='input'>
 <input type="checkbox" name="36.5" id="36.5" onChange={(e)=>{if (e.target.checked) {
  filterByShoesSize('36.5')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="36.5">36.5</label>
 </div>
 <div className='input'>
 <input type="checkbox" name="38" id="38" onChange={(e)=>{if (e.target.checked) {
  filterByShoesSize('38')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="38">38</label>
 </div>
  {/* <button onClick={()=>filterByShoesSize('38')}>38</button> */}
 
</div>
<div className='colour'>
<h3>Colors</h3>
  <button style={{backgroundColor:'yellow'}}>
  <input type="checkbox" name="yellow" id="yellow" onChange={(e)=>{if (e.target.checked) {
  filterByColor('yellow')
}

else{
setFilteredData(data)
}

}}/>
  </button>
  <button  style={{backgroundColor:'brown'}}> <input type="checkbox" name="brown" id="brown" onChange={(e)=>{if (e.target.checked) {
  filterByColor('brown')
}

else{
setFilteredData(data)
}

}}/></button>
  <button  style={{backgroundColor:'#877f65'}}>
  <input type="checkbox" name="khaki" id="khaki" onChange={(e)=>{if (e.target.checked) {
  filterByColor('khaki')
}

else{
setFilteredData(data)
}

}}/>
  </button>
  <button  style={{backgroundColor:'blue'}}>
  <input type="checkbox" name="blue" id="blue" onChange={(e)=>{if (e.target.checked) {
  filterByColor('blue')
}

else{
setFilteredData(data)
}

}}/>
  </button>
  <button  style={{backgroundColor:'orange'}}>
  <input type="checkbox" name="orange" id="orange" onChange={(e)=>{if (e.target.checked) {
  filterByColor('orange')
}

else{
setFilteredData(data)
}

}}/>
  </button>
<button  style={{backgroundColor:'black'}}>
<input type="checkbox" name="black" id="black" onChange={(e)=>{if (e.target.checked) {
  filterByColor('black')
}

else{
setFilteredData(data)
}

}}/>
</button>
</div>
<div className='brand'>
<h3>Brand</h3>
  {/* <button onClick={()=>filterByBrand('River Island')}>River Island</button>
  
  <button onClick={()=>filterByBrand('New Balance')}>New Balance</button>
  <button onClick={()=>filterByBrand('Nike')}>Nike</button>
  <button onClick={()=>filterByBrand('F&F')}>F&F</button>
  <button onClick={()=>filterByBrand('UGG')}>UGG</button> */}
 <div className='input'>
 <input type="checkbox" name="River Island" id="River Island" onChange={(e)=>{if (e.target.checked) {
  filterByBrand('River Island')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="River Island">River Island</label>
 </div>
 <div className='input'>
 <input type="checkbox" name="New Balance" id="New Balance" onChange={(e)=>{if (e.target.checked) {
  filterByBrand('New Balance')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="New Balance">New Balance</label>
 </div>

<div className='input'>
<input type="checkbox" name="Nike" id="Nike" onChange={(e)=>{if (e.target.checked) {
  filterByBrand('Nike')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="Nike">Nike</label>
</div>
<div className='input'>
<input type="checkbox" name="F&F" id="F&F" onChange={(e)=>{if (e.target.checked) {
  filterByBrand('F&F')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="F&F">F&F</label>
</div>
<div className='input'>
<input type="checkbox" name="UGG" id="UGG" onChange={(e)=>{if (e.target.checked) {
  filterByBrand('UGG')
}

else{
setFilteredData(data)
}

}}/>
<label htmlFor="UGG">UGG</label>
</div>
</div>
<div className='price'>
<h3>Price</h3>
<Slider
    range={{
      draggableTrack: true,
    }}
    defaultValue={[0, 150]}
    min={56}
    max={150}
    onChange={handlePriceChange}
    style={{color:'black'}}
  />
</div>
   </div>
   <div className='right_side'>
   <div className='sort_container'>
    <span>Showing<p style={{color:'black'}}>{filteredData.length} of 12</p>products</span>
    <div className='sort'>
      <label htmlFor="">Sort by:</label>
      <select name="" id="" className='sort_select'onChange={(e) => sortData(e.target.value)}>
        <option value="Select">Select</option>
        <option value="A-Z">A-Z</option>
        <option value="price-low-to-high">price:low to high</option>
      </select>
      
      
                            <button className="btn-layout" onClick={handlegrid2}>
                							<svg width="10" height="10">
                								<rect x="0" y="0" width="4" height="4"></rect>
                								<rect x="6" y="0" width="4" height="4"></rect>
                								<rect x="0" y="6" width="4" height="4"></rect>
                								<rect x="6" y="6" width="4" height="4"></rect>
                							</svg>
                						</button>
                            <button className="btn-layout" onClick={handlegrid3}>
                							<svg width="16" height="10">
                								<rect x="0" y="0" width="4" height="4"></rect>
                								<rect x="6" y="0" width="4" height="4"></rect>
                								<rect x="12" y="0" width="4" height="4"></rect>
                								<rect x="0" y="6" width="4" height="4"></rect>
                								<rect x="6" y="6" width="4" height="4"></rect>
                								<rect x="12" y="6" width="4" height="4"></rect>
                							</svg>
                						</button>
                            <button className="btn-layout" onClick={handlegrid4}>
                            <svg width="22" height="10">
                								<rect x="0" y="0" width="4" height="4"></rect>
                								<rect x="6" y="0" width="4" height="4"></rect>
                								<rect x="12" y="0" width="4" height="4"></rect>
                								<rect x="18" y="0" width="4" height="4"></rect>
                								<rect x="0" y="6" width="4" height="4"></rect>
                								<rect x="6" y="6" width="4" height="4"></rect>
                								<rect x="12" y="6" width="4" height="4"></rect>
                								<rect x="18" y="6" width="4" height="4"></rect>
                							</svg>
                              </button>
    
    </div>
  </div>
<div className='container' style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>
  
 
   {pagedatas.map((product) => (
    <div key={product.id} className='card'>
      <img src={product.image} alt={product.name} style={{width:'100%',height:'100%'}}/>
      <div className='txt' key={product.id}>
          <p style={{fontSize:'13px'}}>{product.category}</p>
          <p>{product.name}</p>
          <p className='price'>${product.price}.00</p>
        </div>
    </div>
    
  ))}

</div>
 <div className='pagination'>
  {
    pagenum.map(page=>(
      <button key={page} onClick={()=>setcurrent(page)}>{page}</button>
    ))
  }
 </div>
   </div>
   </div>
   </>
  );
}

export default App;
