import React, { useState, useEffect } from "react";
import Form from './Form';
import ListView from './ListView';
import RecipeView from './RecipeView'
import GroceryListView from './GroceryListView'
import Navigation from './Navigation'
import { v4 as uuid } from 'uuid';


//const fetch = require("node-fetch");

const Cooking = () => {

    const [recipeList, setRecipeList] = useState(JSON.parse(localStorage.getItem('recipeListSaved')) || []);
    const [currentRecipe, setCurrentRecipe] = useState({name: "", steps: "", ingredients: "", quantity: "", link: "", img: "", site: ""});
    const [groceryList, setGroceryList] = useState(JSON.parse(localStorage.getItem('groceryListSaved')) || []);
    const [currentTab, setCurrentTab] = useState("recipes");
    const [recipeView, setRecipeView] = useState("list");
    const [searchButton, setSearchButton] = useState("Search");
    //const [recipeList, setRecipeList] = useState(JSON.parse(localStorage.getItem('recipeListSaved')) || []);
    
    useEffect(() => {
        localStorage.setItem('recipeListSaved', JSON.stringify(recipeList));
      }, [recipeList]);

      useEffect(() => {
        localStorage.setItem('groceryListSaved', JSON.stringify(groceryList));
      }, [groceryList]);
    

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    function buttonReset() {
        setTimeout(() => setSearchButton("Search"), 3000)
    }
    
    const requestHandler = async (e) => {
        setSearchButton("Searching...")
        e.preventDefault()
        const searchTerm = e.target.elements.searchTerm.value;
        const site = e.target.elements.site.value;
        if (!searchTerm || !site) {
            console.log("error");
            setSearchButton("Field blank!");
            buttonReset()       
        }
        
        const search_req = `https://teaspoonapp.herokuapp.com/?term=${searchTerm}&site=${site}`;     
        const result = await fetch(search_req)
        const search_json = await result.json();

        if (recipeList.some(recipe => recipe.text.url === search_json.url)){
            setSearchButton("Already saved!");
            buttonReset()       
        } else if (search_json.dish !== [] && search_json.steps !== [] && search_json.ingredients !== []){
            setSearchButton("Recipe added!");
            buttonReset()
            setRecipeList([{text: search_json, key: uuid()}, ...recipeList]);
            setGroceryList([...groceryList.concat(search_json.parsed_ingredients)].filter(onlyUnique))
        } else {
            setSearchButton("No recipe found.");
            buttonReset()
        }
        return;
    }

    

    const RecipeList = () => (
        <div className="container">
            <div className="scroll-box-main-view">
                    {recipeList.map(recipe => <ListView 
                                                cur={currentRecipe} 
                                                setCurrentRecipe={setCurrentRecipe}
                                                currentRecipe={currentRecipe}
                                                recipeList={recipeList}
                                                setRecipeList={setRecipeList} 
                                                name={recipe.text.dish} 
                                                steps={recipe.text.steps} 
                                                ingredients={recipe.text.ingredients} 
                                                quantity={recipe.text.quantity}
                                                link={recipe.text.url}
                                                key={recipe.key}
                                                img={recipe.text.img}
                                                setRecipeView={setRecipeView}
                                                site={recipe.text.site}>
                                            </ListView>)}
            </div>
        </div>
    )


    if (currentTab === "recipes" && recipeView === "list") {
        return (    
            <div>
                <div className="logo-header">
                <div className="logo">teaspoon</div>
                <div className="info" onClick={() => setCurrentTab('info')}>???</div>
                </div>
                <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab}></Navigation>
                <Form request={requestHandler} searchButton={searchButton}/>
                <RecipeList />    
            </div>
        ) 
    }

    else if (currentTab === "recipes" && recipeView === "current_recipe") {
        return (
            <div>
                <div className="logo-header">
                <div className="logo">teaspoon</div>
                <div className="info" onClick={() => setCurrentTab('info')}>???</div>
                </div>
                <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab}></Navigation>
                <RecipeView 
                        name={currentRecipe.name}
                        steps={currentRecipe.steps}
                        ingredients={currentRecipe.ingredients}
                        quantity={currentRecipe.quantity}
                        link={currentRecipe.link}
                        img={currentRecipe.img}
                        recipeView={recipeView}
                        setRecipeView={setRecipeView}/>
            </div>
        )
    }

    else if (currentTab === 'info'){
        return (
            <div>
                <div className="logo-header">
                    <div className="logo">teaspoon</div>
                </div>
                <div className="info-box">
                    <div className="about">About:</div>
                    <div className="info-back" onClick={() => setCurrentTab('recipes')}>x</div>
                    <div className="info-text">
                        <p>
                        teaspoon is a web app that allows you to search and save recipes from a selection of recipe websites,
                        as well as generating a grocery list from them.
                        the app is an early attempt to make a universal platform and clean user interface for compiling and viewing recipes on the web, which can often be a 
                        fragmented and cumbersome experience! 
                        <br></br><br></br>
                        teaspoon was created by amad ansari using react, express, and node.js. you can find his other projects <a class="personal-site-link" href="https://amad.cool">here</a>.
                        <br></br><br></br>
                        the search feature currently works best with the exact names of recipes as present on their orignal webpages.
                        the app is a work in progress, and some features (especially ingredient parsing and fetched images from epicurious or serious eats) can be buggy! 
                        please email amad@nyu.edu if you find any bugs, have any feature requests,
                        would like to contribute, or are knowledgable about natural language processing and want to help build a more sophisticated parser :)
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (    
            <div>
                <div className="logo-header">
                    <div className="logo">teaspoon</div>
                    <div className="info" onClick={() => setCurrentTab('info')}>???</div>
                </div>
                <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab}></Navigation>
                <GroceryListView list={groceryList} setGroceryList={setGroceryList}/>  
            </div>
        )
    }    
}

export default Cooking;
