import React from "react";

const Form = props => (
	<div className="container">
	<div className="search-container">
	<form onSubmit={props.req}>
		<input type="text" className="Textbox" name="searchTerm" placeholder="enter recipe"/>
		
		<div className="search-button-container">
		<select className="site-selection" id="site" name="site">
    		<option value="cooking.nytimes">NYT Cooking</option>
    		<option value="bonappetit">Bon Appetit</option>
    		<option value="seriouseats">Serious Eats</option>
    		<option value="epicurious">Epicurious</option>
  		</select>
		<button className="Search-button">Search</button>
		</div>
	</form>
	</div>
	</div>
);

export default Form;