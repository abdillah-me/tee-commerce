import { useEffect, useState } from 'react';
import Banner from '../assets/banner.svg'
import axios from 'axios';
import Pagination from '../components/Pagination';
import { BsBag, BsCurrencyDollar, BsFunnel } from 'react-icons/bs';
import formatRupiah from '../helpers/ToRupiah';

const Home = () => {
   const [products, setProducts] = useState([]);
   const [sortedProducts, setSortedProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4;
   const [categories, setCategories] = useState([]);
   const [colors, setColors] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [selectedColors, setSelectedColors] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [sortOrder, setSortOrder] = useState('asc');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('https://646f0ae509ff19b1208674bc.mockapi.io/product');
            const data = response.data;
            setProducts(data);
            setSortedProducts(data);

            const uniqueCategories = Array.from(
               new Set(data.flatMap(product => product.kategori.map(category => category.name)))
            );
            setCategories(uniqueCategories);

            const uniqueColors = Array.from(new Set(data.map(product => product.warna)));
            setColors(uniqueColors);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   useEffect(() => {
      const sorted = [...products].sort(
         (a, b) => new Date(a.created_date) - new Date(b.created_date)
      );

      if (sortOrder === 'desc') {
         sorted.reverse();
      }

      setSortedProducts(sorted);
   }, [products, sortOrder]);

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

   const paginate = pageNumber => setCurrentPage(pageNumber);

   const handlePageChange = event => {
      const pageNumber = Number(event.target.id);
      setCurrentPage(pageNumber);
   };

   const handleFilterByCategory = event => {
      const category = event.target.value;
      if (event.target.checked) {
         setSelectedCategories([...selectedCategories, category]);
      } else {
         const updatedCategories = selectedCategories.filter(c => c !== category);
         setSelectedCategories(updatedCategories);
      }
   };

   const handleFilterByColor = event => {
      const color = event.target.value;
      if (event.target.checked) {
         setSelectedColors([...selectedColors, color]);
      } else {
         const updatedColors = selectedColors.filter(c => c !== color);
         setSelectedColors(updatedColors);
      }
   };

   useEffect(() => {
      let filtered = products;

      if (selectedCategories.length > 0) {
         filtered = filtered.filter(product =>
            product.kategori.some(k => selectedCategories.includes(k.name))
         );
      }

      if (selectedColors.length > 0) {
         filtered = filtered.filter(product => selectedColors.includes(product.warna));
      }

      setSortedProducts(filtered);
   }, [selectedCategories, selectedColors, products]);

   const openModal = product => {
      setSelectedProduct(product);
   };

   const closeModal = () => {
      setSelectedProduct(null);
   };

   const handleSortOrder = () => {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
   };

   return (
      <div id="home" className="mt-4">
         <div className="container mx-auto flex items-start gap-10">
            <div id="left" className="w-2/12 p-3 bg-white shadow-md rounded-md border">
               <div id="title">
                  <h1 className="text-2xl font-semibold">Filter</h1>
               </div>
               <hr className="my-2 border" />
               <div id="category">
                  <h3 className="text-lg font-medium">Category</h3>
                  <hr className="border-2 mt-1 mb-3 w-1/4 border-slate-600 rounded-full" />
                  {
                     categories.map((category, index) => {
                        return (
                           <div id="categoryList" key={index}>
                              <label >
                                 <input type="checkbox"
                                    value={category}
                                    onChange={handleFilterByCategory}
                                    checked={selectedCategories.includes(category)}
                                    className="mr-2"
                                 />
                                 {category}
                              </label>
                           </div>
                        )
                     })
                  }
               </div>
               <hr className="my-4" />
               <div id="colors">
                  <h3 className="text-lg font-medium">Colors</h3>
                  <hr className="border-2 mt-1 mb-3 w-1/4 border-slate-600 rounded-full" />
                  {
                     colors.map((color, index) => {
                        return (
                           <div id="categoryList" key={index}>
                              <label >
                                 <input
                                    type="checkbox"
                                    value={color}
                                    onChange={handleFilterByColor}
                                    checked={selectedColors.includes(color)}
                                    className="mr-2"
                                 />
                                 {color}
                              </label>
                           </div>
                        )
                     })
                  }
               </div>
            </div>
            <div id="right" className='w-10/12'>
               <div id="banner" className='w-full'>
                  <img src={Banner} alt="" className='rounded-md w-full' />
               </div>
               <div id="top" className='my-4 flex items-center justify-between'>
                  <div id="title"><h1 className='text-xl font-bold'>List Product</h1></div>
                  <div id="sort" className='flex items-center gap-2'>
                     <span>Sort Date :</span>
                     <button className='bg-slate-600 text-white text-sm px-4 rounded py-1' onClick={handleSortOrder}>{sortOrder === 'asc' ? 'Terbaru' : 'Terlama'}</button>
                  </div>
               </div>
               <div id="product" className='grid grid-cols-3 gap-4'>
                  {
                     currentItems.map((product, index) => {
                        return (
                           <div key={index} onClick={() => openModal(product)} id="card" className='bg-white border shadow p-3 rounded'>
                              <div className='bg-gray-300 h-[100px] mb-2 rounded-md'></div>
                              <div id="dec" className='rounded-md flex items-center justify-between'>
                                 <div id="name" className='text-slate-600 font-semibold'>
                                    <h1>{product.nama}</h1>
                                 </div>
                                 <div id="price" className='bg-green-800 rounded-md px-4 text-white font-medium'>
                                    {formatRupiah(product.harga)}
                                 </div>
                              </div>
                           </div>
                        )
                     })
                  }
               </div>
               <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={sortedProducts.length}
                  currentPage={currentPage}
                  paginate={paginate}
                  handlePageChange={handlePageChange}
               />
               {
                  selectedProduct && (
                     <div id="modal">
                        <div onClick={closeModal} className='bg-black absolute w-screen h-screen top-0 left-0 right-0 bg-opacity-75'></div>
                        <div id="box" className='bg-white px-5 py-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md'>
                           <div id="content" className='flex gap-2'>
                              <div id="image" className='bg-slate-100 w-[300px] h-[300px] rounded-md'></div>
                              <div id="detail" className='flex flex-col gap-3'>
                                 <div id="title">
                                    <h3 className='font-medium text-xl'>{selectedProduct.nama}</h3>
                                    <hr className='border-2 border-slate-600 w-1/2 rounded-full mt-2' />
                                 </div>
                                 <p className='flex items-center gap-2'>
                                    <BsCurrencyDollar /> {formatRupiah(selectedProduct.harga)}
                                 </p>
                                 <p className='flex items-center gap-2'>
                                    <BsBag />{selectedProduct.stok}
                                 </p>
                                 <p className='flex items-center gap-2'>
                                    <BsFunnel />{selectedProduct.warna}
                                 </p>
                                 <p className='bg-slate-100 px-2 py-1 rounded mt-2 text-xs'>Input: {selectedProduct.created_date}</p>
                              </div>
                           </div>
                           <button onClick={closeModal} className='bg-red-700 px-4 py-1 text-xs rounded text-white mt-5'>Close</button>
                        </div>
                     </div>
                  )
               }
            </div>
         </div>

      </div>
   )
}

export default Home