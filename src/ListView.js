import React from "react";
import { v4 as uuid } from 'uuid';
 


const ListView = (props) => {
    
    const handleClick = () => {    
        props.setCurrentRecipe({name: props.name, 
                    steps: props.steps, 
                    ingredients: props.ingredients, 
                    quantity: props.quantity, 
                    link: props.link,
                    img: props.img,
                    site: props.site})
        props.setRecipeView("current_recipe");
    }

    const title_case = (str) => {
        str = str.toLowerCase();
        str = str.split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ')
    }  

    const convert = (site) => {

        switch (site){
            case "cooking.nytimes":
                return "NYT Cooking";
            case "epicurious":
                return "Epicurious"
            case "bonappetit":
                return "Bon Appetit"
            case "seriouseats":
                return "Serious Eats";
            default:
                return "";
        }
    }

    const deleteItem = (matched_recipe) => {
        const updatedList = [...props.recipeList].filter((recipe) => recipe.text.dish !== matched_recipe);
        props.setRecipeList(updatedList)
    }
  
    return (
        <div className="container">
            <div className="box" key={uuid()}>
                <div className="box-recipe" onClick={handleClick}>{title_case(props.name)}</div>
                <div className="box-site" onClick={handleClick}>{convert(props.site)}</div>
                <div className="recipe-delete-button" onClick={() => deleteItem(props.name)}>╳</div>
            </div>
        </div>
    )
}

export default ListView;

// <button onClick={() => deleteItem(props.key)}>X</button>