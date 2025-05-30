import { berachainClient } from "../../config";
import { WOOFiPoolProvider } from "./WOOFiPoolProvider";

const stateProvider = new WOOFiPoolProvider(berachainClient);

stateProvider.start();
