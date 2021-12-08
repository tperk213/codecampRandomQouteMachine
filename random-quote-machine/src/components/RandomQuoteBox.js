import React, { Component } from 'react'

const styles = {
    backgroundColor: '#16a085',
    width: 450,
    position: 'relative',

}

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

export default class RandomQuoteBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            Quotes: [],
            selectedQuote: {text:'', author:''},
            selectedColor: '#16a085',
        }
        this.getRandomQuote = this.getRandomQuote.bind(this);
        this.populateQuotes = this.populateQuotes.bind(this);
    }

    async componentDidMount(){
        await this.populateQuotes();
        this.getRandomQuote();
    }

    async populateQuotes(){
         //get quote from third party call
         const result = await fetch(
            "https://type.fit/api/quotes", 
            {
                method:'GET',
            });
        //handle errors to call here
        
        const quotes = await result.json();
        

        //populate quotes in state
        this.setState(()=>{
            return({
                Quotes: quotes,
            })
        });
            
        
    }
    
    getRandomQuote(){
        
        const ranNum = Math.floor(Math.random()*this.state.Quotes.length);
        const quote = this.state.Quotes[ranNum]; 
        
        //randomize the color
        const num = Math.floor(Math.random()*colors.length);
        const newColor = colors[num]; 
        //change the colour of the div and background
        //probably should be handled by redux
        this.setState(()=>{
           return({
               selectedQuote: quote,
               selectedColor: newColor
            }); 
        });        
    }
    
    render(){

        return(
            <div className="quote-box" style={{
                ...styles, 
                backgroundColor: this.state.selectedColor,
                transition: "background-color 1000ms linear",
                WebkitTransition: "background-color 1000ms linear",
                MozTransition: "background-color 1000ms linear"
                }} id="quote-box">
                
                <div className="quote-text" id="text">"{this.state.selectedQuote.text}</div>
                
                <div className="quote-author" id="author">{this.state.selectedQuote.author}</div>
                <a href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(this.state.selectedQuote.author)+'&content=' + encodeURIComponent(this.state.selectedQuote.text)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}>Tumbler</a>
                <a id="tweet-qoute" target="_blank" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+encodeURIComponent('"'+this.state.selectedQuote.text+'" '+this.state.selectedQuote.author)}>Twiter</a>
                
                <button id="new-quote" onClick={this.getRandomQuote}>Get a random qoute</button>
            </div>
        );
    }
}
