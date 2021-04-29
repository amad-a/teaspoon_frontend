import { React } from 'react';

const Navigation = (props) => {

    if (props.currentTab === "recipes") {
        return (
            <div className="container">
                <div className="recipes-tab-active">Recipes</div>
                <div className="grocery-tab-inactive" onClick={() => props.setCurrentTab("grocery_list")}>Grocery List</div>
            </div>
        )
    }

    else if (props.currentTab === "grocery_list") {
        return (
            <div className="container">
                <div className="recipes-tab-inactive" onClick={() => props.setCurrentTab("recipes")}>Recipes</div>
                <div className="grocery-tab-active">Grocery List</div>
            </div>
        )
    }
}

export default Navigation;