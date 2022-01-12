function getRandomValue(min, max){
   return  Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
    data(){
        return{
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },

    computed:{
        monsterBarStyles(){
            return this.monsterHealth < 0 ? {width: '0%'} : {width: this.monsterHealth + '%'};
    
        },
        playerBarStyles(){
            return this.playerHealth < 0 ? {width: '0%'} : {width: this.playerHealth + '%'};
        },

        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },

    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'It is  a draw';

            }else if(value <= 0){
                this.winner = 'You Lost!';
                
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){

            }else if(value <= 0){
                
                this.winner = 'You won!';

            }
        }
    },

    methods:{
        startNewGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
       
        },

        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue)
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue)

        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'special-attack', attackValue)
        },
        heal(){
            this.currentRound++;
            const healValue = getRandomValue(5, 12);
            if(this.playerHealth + healValue >= 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
                this.addLogMessage('player', 'heal', healValue)

            }
            this.attackPlayer();
        },

        surrender(){
            this.winner = "You lost!";
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
        
    }

});

app.mount('#game');