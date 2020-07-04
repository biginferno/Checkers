import React, {Component} from 'react'


export class Tile {
    constructor(col, row, gamePiece, team){
        this.column = col;
        this.row = row;
        this.isGamePiece = gamePiece;
        this.team = team;
        this.highlight = false;
        
    }

    getColumn(){
        return this.column;
    }
    setColumn(col){
        this.column = col;
    }
    getRow(){
        return this.row;
    }
    setRow(row){
        this.row = row;
    }
    getGamePiece(){
        return this.isGamePiece;
    }
    setGamePiece(isGamePiece){
        this.isGamePiece = isGamePiece;
    }
    getTeam(){
        return this.team;
    }
    setTeam(team){
        this.team = team;
    }
    getHighlight(){
        return this.highlight;
    }
    setHighlight(bool){
        this.highlight = bool;
    }
}

export class TilePiece extends Component {

    constructor(props){
        super(props);
        //Initialize basic game_piece attributes
        this.state = {
            column:0,
            row:0,
            //Determine if the piece should be rendered
            isGamePiece:false,
            //Determine if a piece can be moved to this tile
            isOccupied:false,
            //Initialize triangle inline-css
            triangle: {
                width: 0,
                height: 0,
                border_left: "25px solid transparent",
                border_right: "25px solid transparent",
                border_bottom: "50px solid #555"
            },
            //Initialize circle inline-css
            circle: {
                height:0,
                width:0,
                border_radius:"50%",
                display:"inline-block"
            },
            //Initialize player options
            shape:"circle",
            shapeColor:"Red",
            player:1
        }
    }

    //On component mount create a player 1 tile_piece based the initial row
    createPlayer1(col, row, height,width) {
        this.setState({
            column:col,
            row:row,
            triangle:{
                height:height,
                width:width,
                border_left: "25px solid transparent",
                border_right: "25px solid transparent",
                border_bottom: "50px solid #555"
            },
            circle:{
                height:height,
                width:width,
                border_radius:"50%",
                display:"inline-block"
            },
            isGamePiece:true,
            isOccupied:true,
            shapeColor:this.props.player1_color,
            shape:this.props.player_shape
        })
    }
    
    //On component mount create a player 2 tile_piece based the initial row
    createPlayer2(col, row, height, width) {
        
        this.setState({
            column:col,
            row:row,
            triangle:{
                height:height,
                width:width,
                border_left: "25px solid transparent",
                border_right: "25px solid transparent",
                border_bottom: "50px solid #555"
            },
            circle:{
                height:height,
                width:width,
                border_radius:"50%",
                display:"inline-block"
            },
            isGamePiece:true,
            isOccupied:true,
            player:2,
            shapeColor:this.props.player2_color,
            shape:this.props.player_shape
        })
    }
    //On component mount create an empty tile_piece based the initial row
    createEmptyTile(col, row) {
        this.setState({
            column:col,
            row:row,
            isGamePiece:false,
            isOccupied:false,
            player:0,
            ShapeColor:"white"
        })
    }

    //Determines what type of tile will be created based on the row
    createTile() {
        let col = this.props.tile.getColumn();
        let row = this.props.tile.getRow();
        let height = this.props.height;
        let width = this.props.width;
        if(row === 0 || row === 1){
            this.createPlayer1(col,row,height,width);
        }
        else if (row === 6 || row === 7)
            this.createPlayer2(col, row, height, width);
        else
            this.createEmptyTile(col, row)
    }
    componentDidMount() {
        this.createTile();
    }

    //Update the tile based on the input of color and shape, each player has different colors, but share the same shape
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.player_shape !== this.props.player_shape){
            this.setState({
                shape:this.props.player_shape
            })
        }
        if(this.state.player === 1){
            if(prevProps.player1_color !== this.props.player1_color){
                this.setState({
                    shapeColor:this.props.player1_color
                })
            }
        }
        else if(this.state.player === 2){
            if(prevProps.player2_color !== this.props.player2_color){
                this.setState({
                    shapeColor:this.props.player2_color
                })
            }
        }
    }
    render(){
        
        let currentTilePiece = this.state.shape;
        let player  = this.state.player;
        let isGamePiece = this.state.isGamePiece;
        let background = this.state.shapeColor;
        
        if(isGamePiece){
            if(currentTilePiece === "circle"){
            //Render a circle
                let color = this.state.circle;
                let height = color.height;
                let width = color.width;
                let borderradius = color.border_radius;
                let display = color.display;
                return (
                    <div className="circle"
                        style={{
                            height:25,
                            width:25,
                            background:background,
                            borderRadius:borderradius,
                            display:display,
                        }}>
                        </div>
                    )
            }
            else{
            //Render a triangle
                let color = this.state.triangle;

                return (
                    <div className="triangle"
                        style={{
                            width: 0,
                            height: 0, 
                            borderLeft: "25px solid transparent",
                            borderRight: "25px solid transparent",
                            borderBottom: `50px solid ${background}`,
                        }}>
                    </div>
                )
            }
        }
        else{
            return(<div></div>)
        }
        
    
    }
}