import { addNewQuiz } from '../controllers/questionsControllers';

const routes = (app) => {
    app.route('/quiz')
        // This is the post endpoint
        .post(addNewQuiz);
}

export default routes;