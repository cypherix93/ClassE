import winston = require("winston");
import {Config} from "../config/Config";

winston.level = Config.current.winston.level;

export const Logger = winston;