// @ts-nocheck
import { timeStamp } from 'console';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const resultsSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        tests: [
            {
                test_id: {
                    type: String,
                    required: true,
                },
                score: {
                    type: Number,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                },
                timeTaken: {
                    type: Number,
                    required: true,
                },
                QnA: [
                    {
                        question: {
                            type: String,
                            required: true,
                        },
                        difficulty: {
                            type: Number,
                            required: true,
                        },
                        tag: {
                            type: String,
                            required: true,
                        },
                        selected_answer: {
                            type: Number,
                            required: true,
                        },
                        correct_answer: {
                            type: Number,
                            required: true,
                        },
                        is_correct: {
                            type: Boolean,
                            required: true,
                        },
                        options: {
                            type: Array,
                            required: true,
                        }
                    }
                ],
                timeStamp:{
                    type: Date,
                    default: Date.now,
                }

            },
        ]

    },
    { timestamps: true }
);

const Results = mongoose.model('Results', resultsSchema, 'Results');

export default Results;
