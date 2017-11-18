class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.currentState = config.initial;
        this.states = config.states;
        this.undoString = '';
        this.redoString = '';
    }
  
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }
  
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.states){
            this.undoString = this.currentState;
            this.currentState = state;
            this.redoString = this.currentState;
        }
        else
            throw new Error();
           
    }
  
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(event in this.config.states[this.currentState].transitions){
            this.undoString = this.currentState;
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.redoString = this.currentState;
        }
        else{
            throw new Error();
        }
    }
  
    /**
     * Resets FSM state to initial.
     */
   
    reset() {
        this.currentState = this.config.initial;
    }
  
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    
    getStates(event) {
        let result = [];
        if(typeof event === 'undefined'){
            for(let key in this.config.states)
                result.push(key);
            return result;
        }
        for(let key in this.config.states){
            if(typeof this.config.states[key].transitions[event] !== 'undefined')
                result.push(key);
        }
        if(result.length == 0)
            return [];
        return result;
    }
  
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(!this.undoString)
            return false;
        else{
            this.currentState = this.undoString;
            this.undoString = '';
            return true;
        }
        return false;
    }
  
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */ 
    redo() {
        if(!this.redoString)
            return false;
        else{
            this.currentState = this.redoString;
            this.redoString = '';
            return true;
        }
        
        return false;
    }
  
    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoString = '';
        this.redoString = '';
    }
  }

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
