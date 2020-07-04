import React, {Component} from 'react'

import {Tile, TilePiece} from './tile'

import '../css/gameboard.css'


export default class Gameboard extends Component {

    
    constructor(props){
        
        super(props);

        this.state = {

            //Create Gameboard Specifications
            default_size:8,
            input_size:0,
            size:8,
            tile_height:50,
            tile_width:50,
            game_board_height:600,
            game_board_width:600,
            
            tile_arrays:[],
            board_html:"",
            
            //Initialize Player Colors/Shapes
            player1_color:"red",
            player2_color:"blue",
            shape:"circle",

            //Initialize Player Color/Shape Options
            shape_options:["circle", "triangle"],
            player1_colors:["red", "orange", "yellow"],
            player2_colors:["blue", "purple", "green"],

            chosenTile:null,

        }

    }
    createBoard(){
        let size = this.state.size;
        let square_dim = 600 / size;
        
        this.setState({
            tile_height: square_dim,
            tile_width: square_dim
        });

        this.createTileArray();
        this.refreshBoard();
        
    }
    componentDidMount(){
        this.createBoard();
    }
    
    //Input handling for chanding Player 1 Color
    setPlayer1Color(changeEvent) {
        this.setState({
          player1_color: changeEvent.target.value
        });
    }
    //Input handling for chanding Player 2 Color
    setPlayer2Color(event){
        this.setState({
            player2_color: event.target.value
        })
    }

    //Input Handling for Player Shapes
    setPlayerShapes(event){
        // console.log("Refreshing Shape")
        this.setState({
            shape: event.target.value
        },
        // ()=>console.log("Refreshing Shape", this.state.shape)
        )
    }

    createTileArray(){
        let new_array = [];
        let size = this.state.size;
        // let total_tiles = size * size;
        this.setState({
            tile_arrays:new_array
        })
        for(let row = 0; row < size; row++){
            
            for(let column = 0; column < size; column++){
                
                if(row === 0 || row === 1){
                    //Player 1
                    new_array.push(new Tile(column, row, true, 1))
                }
                else if(row === size - 1 || row === size - 2){
                    //Player 2
                    new_array.push(new Tile(column, row, true, 2))
                }
                else{
                    //Empty Tile
                    new_array.push(new Tile(column, row, false, 0))
                }

            }
        }
        // console.log("Tile to be set into the state", new_array);
        this.setState({
            tile_arrays:new_array,
        });
        // console.log("Tile to be set into the state", this.state);
    }
    createBoardColors(row, cur_col){
        let color = "white";
        if((row%2) === 0){
            //Even Rows
            if((cur_col%2) === 0){
                //Even Column
                color = "black";
            }

        }
        else {
            //Odd Rows
            if((cur_col%2) !== 0){
                //Odd Columns i.e (1,1), (2,3)
                color = "black";
            }
        }
        return color;
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevState.tile_arrays !== this.state.tile_arrays){
            this.refreshBoard();
        }
        if(prevState.shape !== this.state.shape){
            // console.log("Refreshing Board");
            this.refreshBoard();
        }
        if(prevState.player1_color !== this.state.player1_color){
            // console.log("Refreshing Board");
            this.refreshBoard();
        }
        if(prevState.player2_color !== this.state.player2_color){
            // console.log("Refreshing Board");
            this.refreshBoard();
        }
    }
    isMoveAble(currentTile, chosenTile){
        let chosenRow = chosenTile.getRow();
        let chosenCol = chosenTile.getColumn();

        let currentRow = currentTile.getRow();
        let currentCol = currentTile.getColumn();
        
        if(true)
            return true;
        return false;
    }
    handleTileOptions(event, tile){
        let chosenTile = this.state.chosenTile;
        let arrayOfTiles = this.state.tile_arrays;

        let thisTileRow = tile.getRow();
        let thisTileColumn = tile.getColumn();
        //We haven't chosen a tile to move yet
        if(chosenTile === null){
            //We should highlight the chosenTile and the moveable spots

            //on rerender this will highlight the tile
            tile.setHighlight(true);
            this.setState({
                chosenTile:tile
            });
            


        }
        //We already have a tile we are moving
        //Determine if the new chosenTile is a moveable spot
        else {
            //If the spot is moveable
            if(this.isMoveAble(tile, chosenTile)){
                //1)Update the array of tiles to be rerendered with the new move
                //2)Unhighlight the moveable spots and the tile
                //3)Update state to disallow movement again
            }
            //Else the spot is not moveable: Two Options for implementation
                //1)Deselect the currenTile and select the new spot
                //2)Or notify the user you can't move
            
            
        }
    }
    refreshBoard(){
        
        let size = this.state.size;
        let row_height = this.state.tile_height;
        let row_width = this.state.tile_width;
        let player1_color = this.state.player1_color;
        let player2_color = this.state.player2_color;
        let player_shape = this.state.shape;
        let tiles = this.state.tile_arrays;
        // console.log("Shape",player_shape);
        const tiles_jsx = tiles.map((tile, i) => {
            let background = this.createBoardColors(tile.getRow(), tile.getColumn())
            return (
                <div className="tile"
                    onClick={event => this.handleTileOptions(event, tile)}
                    style={{
                        float:"left",
                        width:row_width,
                        height:row_height,
                        background:background
                    }}>
                    <TilePiece 
                        tile={tile} 
                        key={i}
                        player1_color={player1_color}
                        player2_color={player2_color}
                        player_shape={player_shape}/>
                </div>
            )
            
        });
        this.setState({
            board_html:tiles_jsx
        })
    }
    
    render() {
        //Gameboard Setup
        //Create JSX for Row
        let board_html = this.state.board_html;

        //Game Options Initializtation
        let shape_options = this.state.shape_options;
        let player1_colors = this.state.player1_colors;
        let player2_colors = this.state.player2_colors;


        
        
        return(
            <div>
                <div className="checkerboard">
                    {board_html}
                </div>


                <div className="game-options"
                    style={{
                        width:600,
                        height:200,
                        fontColor:"red",
                        fontSize:"20px",
                        border:"solid"
                    }}>

                    <div className="color-change-player1"> 
                        <h4>Player 1 Color</h4>
                        <div onChange={event => this.setPlayer1Color(event)}>
                            <div><input type="radio" value={player1_colors[0]} defaultChecked name="color"/> {player1_colors[0]}</div>
                            <div><input type="radio" value={player1_colors[1]} name="color"/> {player1_colors[1]}</div>
                            <div><input type="radio" value={player1_colors[2]} name="color"/> {player1_colors[2]}</div>
                        </div>
                    </div>

                    <div className="color-change-player2">
                        <h4>Player 2 Color</h4>
                        <div onChange={event => this.setPlayer2Color(event)} >
                            <div><input type="radio" value={player2_colors[0]} defaultChecked name="color2"/> {player2_colors[0]}</div>
                            <div><input type="radio" value={player2_colors[1]} name="color2"/> {player2_colors[1]}</div>
                            <div><input type="radio" value={player2_colors[2]} name="color2"/> {player2_colors[2]}</div>
                        </div>
                    </div>
                    <div className="shape-change">
                    <h4>Player Shapes</h4>
                        <div onChange={event => this.setPlayerShapes(event)} >
                            <div><input type="radio" value={shape_options[0]} defaultChecked name="shape"/> {shape_options[0]}</div>
                            <div><input type="radio" value={shape_options[1]} name="shape"/> {shape_options[1]}</div>
                        </div>
                    </div>
                </div>

            </div>
                )
    }



}
