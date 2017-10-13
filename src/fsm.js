class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.currentState = config.initial;
        this.states = config.states;
        this.array = [];
        this.array.push(this.currentState);
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
            this.currentState = state;
            this.array.push(this.currentState);
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
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.array.push(this.currentState);
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
        
        if(!event){
          var result = [];
          for(var key in this.config.states)
            result.push(key);
          return result;
        }
        else{
            var result = [];
            for(var key in this.config.states[''+event].transitions)
                result.push(key);
            return result;
        }
    }
  
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.array.length == 0 || this.array.length == 1)
            return false;
        if(this.array[this.array.length - 2]){
            this.currentState = this.array[this.array.length - 2];
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
        if(this.currentState == this.config.initial && this.array.length == 1)
            return false;
        
        return false;
    }
  
    /**
     * Clears transition history
     */
    clearHistory() {
        this.array = [];
    }
  }

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
