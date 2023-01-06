"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessonValidator {
    constructor() { }
    validateBody() {
        return (req, res, next) => {
            try {
                var entry = req.body["entry"][0];
                var changes = entry["changes"][0];
                var value = changes["value"];
                var messageObject = value["messages"];
                if (typeof messageObject != "undefined") {
                    req.body = messageObject;
                }
                else {
                    throw new Error('¡Ups!');
                }
                next();
            }
            catch (error) {
                res.send("EVENT_RECEIVEDss");
            }
        };
    }
}
exports.default = LessonValidator;
