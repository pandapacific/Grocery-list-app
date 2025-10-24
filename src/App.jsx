import Header from './Header';
import SearchItem from './searchItem';
import AddItem from './addItem';
import Content from './Content';
import Footer from './Footer';
import {useState, useEffect} from 'react';



function App() {
  const [items, setItems] = useState([] );
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const API_URL = "http://localhost:5173/";

  useEffect(() => {
    try {
      const FetchItems = async () => {
        const response = await fetch(API_URL);
        const fetchedItems = await response.json();
        console.log(fetchedItems);
        setItems(fetchedItems);
      }
      (async () => await FetchItems())()
    } catch (err) {
      console.log (err.stack);
    }
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length-1].id +1 :  1;
    const myNewItem = {id: id, checked: false, items: item};
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('')
  }

  return(
    <div className="App">
      <Header
      title = {"Grocery List"}
       />
       
      <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />

      <SearchItem
       search = {search}
       setSearch = {setSearch}
        />

      <Content 
      items = {
        items.filter((item) => {
          return (item.items).toLowerCase().includes(search.toLowerCase());
        })
      }
      setItems = {setItems}
      handleCheck = {handleCheck}
      handleDelete = {handleDelete}
      />

      <Footer 
      length = {items.length}
      />

    </div>
   )
}

export default App
