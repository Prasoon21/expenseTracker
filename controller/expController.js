const Sequelize = require('sequelize');
const Expense = require('../models/expSequelize');

exports.getExpense = async (req,res,next)=>{
    try {
        const data=await Expense.findAll();
        console.log(data);
        res.json(data)
        
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(600).json(error)
    }
}

exports.addExpense= async (req,res,next)=>


    {
        if(!req.body.amount||!req.body.description||!req.body.category)
        {
            console.log('missing req fields');
            return res.sendStatus(500)
        }


        try {
        const amount=req.body.amount;
        const description=req.body.description;
        const category=req.body.category;
        
        console.log(amount,description,category);
    
    const data=await Expense.create({
            amount:amount,
            description:description,
            category:category
        });

        console.log('updated success');
    
        res.status(201).json(data)
} catch (error) {
    
    console.log(error,JSON.stringify(error))

     res.status(501).json({error})
    
}

    }

    exports.deleteExpense= async (req,res,next)=>{
        try {
        
            if(!req.params.id||req.params.id==='undefined')
            {
                console.log('ID is Missing');
                return res.sendStatus(420)
            }
            const expenseId=req.params.id;
            
            await Expense.destroy({where:{id:expenseId}})
            res.sendStatus(200);
            console.log(`sucessfully deleted ${expenseId}`);
        } catch (error) {
            console.log(JSON.stringify(error));
            res.status(404).json({error})
            
        }
        
        
        
        
        }