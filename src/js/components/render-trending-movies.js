import dataStorage from './data-storage';
import { loadMovies } from './load-movies';

dataStorage.saveGenresToLS();
loadMovies('day');
