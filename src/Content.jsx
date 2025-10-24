import ListItems from "./listItems";

const Content = ({items, handleCheck, handleDelete}) => {
   

    return (
        <main>
            {items.length ? (
                <ListItems 
                    items = {items}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete} 
                    />
            ) : (
                <div>
                    Your list is empty.
                </div>
            )}
        </main>
    )
}

export default Content