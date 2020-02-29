import mongoose from 'mongoose';

import { questionSchema } from '../models/questionsModel';

const Quiz = mongoose.model('Quiz', questionSchema);

export const addNewQuiz = (req, res) => { 

    let newQuiz = new Quiz(req.body);

    newQuiz.save((err, Quiz) => {
        if (err) {
            res.send(err)
        }
        res.json(Quiz);
    });

}