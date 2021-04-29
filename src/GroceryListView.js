import React from 'react';
import { v4 as uuid } from 'uuid';

const GroceryListView = (props) => {


    
    const removeItem = (item) => {
        const updatedGroceryList = [...props.list].filter((ingredient) => ingredient !== item);
        props.setGroceryList(updatedGroceryList);
    } 

    

    //<button className="grocery-edit-button" onClick={() => setTodoEditing(item)}>✎</button> &nbsp;
    
    const List = () => (
        <div className="container">
    
   
            <div className="scroll-box-grocery-view">
                &nbsp;
                    {props.list.sort().map((item) => 
                        <div className="container">
                            <li className="grocery-list-item" key={uuid()}>
                                <button className="grocery-edit-button" onClick={() => removeItem(item)}>╳</button> &nbsp;
                                
                                {item}
                            </li> 
                            <div className="check-container"><input type="checkbox"></input> &nbsp;</div>
                        </div>)
                    }
            </div>
        </div>
    )
    
    return (
        <div>
            <List />
        </div>
    )
}

export default GroceryListView;



//https://www.google.com/search?q=pesto+site:%22bonappetit.com%22&btnI