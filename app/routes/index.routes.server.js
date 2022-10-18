//Index routes 
import { Router } from 'express';
import { displayHomePage, displayAboutPage, displayProjectsPage, displayServicesPage, displayContactPage } from '../controllers/index.controller.server.js'

// Instanciating the router
const router = Router();

// add middleware to connect application
router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/projects', displayProjectsPage);
router.get('/services', displayServicesPage);
router.get('/contact', displayContactPage);

export default router;


// app.use('/json', helloJson);
// app.use('/html', helloHtml);
// app.use('/', helloPlein);