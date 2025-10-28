import Header from './Header';
import SearchItem from './searchItem';
import AddItem from './addItem';
import Content from './Content';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import apiRequest from './apiRequest.js';



function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const API_URL = "http://localhost:3500/items";
  const [isLoading, setIsLoading] = useState(true);

  // Read functionality
  useEffect(() => {
    const FetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not recieve expected data.');
        const fetchedItems = await response.json();
        // Failsafe: normalize id types to numbers
        const normalized = fetchedItems.map(item => ({ ...item, id: Number(item.id) }));
        setItems(normalized);     
      } catch (err) {
        setFetchError(err.message);
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      FetchItems()
    }, 0)
  }, [])

  // Create functionality
  const addItem = async (item) => {
    // const id = items.length ? (items[(items.length)-1].id) + 1 :  1;
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const myNewItem = {id: nextId, checked: false, items: item};
    const listItems = [...items, myNewItem];
    setItems(listItems);
    console.log(listItems);

    const url = API_URL;
    const optionsObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem), 
    }
    const result = await apiRequest(url, optionsObj);
    if (result) setFetchError(result);
  }

  // Update functionality
  const handleCheck = async (id) => {
    // Convert id to number if it's coming as string
    const numId = Number(id);
    
    const listItems = items.map((item) => 
      Number(item.id) === numId ? {...item, checked: !item.checked} : item
    );
    setItems(listItems);

    const myItem = listItems.find((item) => item.id === numId);
    const url = `${API_URL}/${numId}`;
    
    const optionsObj = {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem.checked}), 
    }
    const result = await apiRequest(url, optionsObj);
    if (result) setFetchError(result);
  }

  // Delete functionality
  const handleDelete = async (id) => {
    const numId = Number(id);
    const listItems = items.filter((item) => Number(item.id) !== numId);
    setItems(listItems);

    const url = `${API_URL}/${numId}`;
    const optionsObj = {
      method: 'DELETE'
    };
    const result = await apiRequest(url, optionsObj);
    if (result) setFetchError(result);
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

      <main>
        {fetchError &&
        <p style={{color: "red"}}>{`Error: ${fetchError}`}</p> 
        }
        {isLoading &&
        <p style={{color: "blue"}}>{"Loading..."}</p> 
        }
        {!fetchError && !isLoading && <Content 
        items = {
          items.filter((item) => {
            return (item.items).toLowerCase().includes(search.toLowerCase());
          })
        }
        setItems = {setItems}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />}
      </main>
      
      <Footer 
      length = {items.length}
      />

    </div>
  );
}

export default App
