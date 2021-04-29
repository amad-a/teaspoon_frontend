import { v4 as uuid } from 'uuid';


const RecipeView = (props) => {

        const combined_ingredients = []

        for (let i in props.ingredients){
            if (props.quantity[i])
                combined_ingredients[i] = props.quantity[i] + " " + props.ingredients[i]
            else {
                combined_ingredients[i] = props.ingredients[i];
            }
        }
        
        const title_case = (str) => {
            str = str.toLowerCase();
            str = str.split(' ');
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(' ')
        }  
        
        const image_render = () => {
            if (props.img) {
                return <img src={props.img} alt={props.name}></img>     
            }
        }
        
        return (
            <div>
                <div className="container">
                    <div className="title-box">
                    <div className="title-text"> {title_case(props.name)} </div>
                        <button className="back-button" onClick={() => props.setRecipeView("list")}>ᐊ</button>
                    </div>
                </div>
                <div className="container">
                    <div className="recipe-box">
                        {image_render()}
                        <h3 id="ingredients">Ingredients:</h3>
                            <div >{combined_ingredients.map((ingredient) => <li className="ingredients" key={uuid()}>{ingredient}</li>)}</div>
                        <h3 id="steps">Steps:</h3>
                            <div><ol>{props.steps.map((step) => <li key={uuid()}>{step}<br></br><br></br></li>)}</ol></div>
                        <h3 className="origin-link"><a href={props.link}>Go to original page</a></h3>
                    </div> 
                </div>
            </div>    
        ) 
}


export default RecipeView;