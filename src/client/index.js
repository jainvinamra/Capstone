import { addTrip } from './js/addTrip.js';
import './styles/base.scss';
import './styles/citydate.scss';
import './styles/details.scss';
import './styles/dropdowns.scss';
import './styles/header.scss';
import './styles/image.scss';
import './styles/lists.scss';
import './styles/main.scss';
import './styles/saveremove.scss';
import './styles/tripinfo.scss';

document.getElementById('addButton').addEventListener('click', function() {addTrip('http://localhost:8000/add')});
