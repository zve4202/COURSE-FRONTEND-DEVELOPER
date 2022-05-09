import React, { useState } from "react";
import Counter from "./counter";

const CountersList = () => {
    const initialState = [
        {id: 0, value: 0, name: "Ненужная вещь"},
        {id: 1, value: 4, name: "Ложка"}, 
        {id: 2, value: 0, name: "Вилка"},
        {id: 3, value: 0, name: "Тарелка"},
        {id: 4, value: 0, name: "Набор минималиста"},
    ];
    const [counters, setCounters] = useState(initialState);
    const handleDelete =(id) =>{        
        const newCounters = counters.filter(c=> c.id!== id);
        setCounters(newCounters);
    }
    const handleReset =()=>{
        setCounters(initialState);
    }
    const handleIncrement =(id)=>{
        console.log("handleIncrement");
        const newCounters = counters.map(c=> {
            if (c.id === id){
                c.value +=1;
            }
            return c;
        });

        setCounters(newCounters);
    }
    const handleDecrement =(id)=>{
        console.log("handleDecrement");
        const newCounters = counters.map(c=> {
            if (c.id === id){
                c.value -=1;
            }
            return c;
        });

        setCounters(newCounters);
    }


    return <>
        {counters.map((counter)=><Counter 
            key={counter.id} 
            onDelete = {handleDelete}
            onIncrement = {handleIncrement}
            onDecrement = {handleDecrement}
            {...counter}
        />)}
        <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>Сброс</button>
    </>
}

export default CountersList;