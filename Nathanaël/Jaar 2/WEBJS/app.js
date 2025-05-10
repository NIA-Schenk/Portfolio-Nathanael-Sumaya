document.addEventListener("DOMContentLoaded", () => {
    // Load CSS
    // const cssDir = 'css/';
    // fetch(cssDir)
    //     .then(response => response.text())
    //     .then(html => {
    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(html, 'text/html');
    //         const links = Array.from(doc.querySelectorAll('a'))
    //             .map(a => a.href)
    //             .filter(href => href.endsWith('.css'))
    //             .map(href => href.split('/').pop());

    //         links.forEach(link => {
    //             const stylesheet = document.createElement("link");
    //             stylesheet.rel = "stylesheet";
    //             stylesheet.href = cssDir + link;
    //             document.head.appendChild(stylesheet);
    //         });
    //     })
    //     .catch(error => console.error("Error loading CSS:", error));
    
    // Add HTML base
    document.body.innerHTML = `
    <div class="app-container"> 
        <section class="sidebar"> 
            <h1>Future Color</h1> 
            <div class="tab-container"> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'welcome')" id="defaultOpenTab"> 
                    Welcome 
                </button> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'help')"> 
                    FAQ 
                </button> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'ingredients-and-pots')"> 
                    Ingredients & Pots 
                </button> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'color-test')"> 
                    Color Tester 
                </button> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'mixing-hall-1')"> 
                    Mixing Hall 1 
                </button> 
                <button class="tablinks" onclick="TabHelper.openTab(event, 'mixing-hall-2')"> 
                    Mixing Hall 2 
                </button> 
            </div> 
            <div class="sidebar-drop-section"></div> 
        </section> 
        <section class="main-content"> 
            <div id="welcome" class="content"> 
                <div class="welcome-container"></div> 
            </div> 
            <div id="help" class="content"> 
                <div class="help-container"></div> 
            </div> 
            <div id="ingredients-and-pots" class="ingredients-and-pots-container content"> 
                <div class="ingredients-and-pots-container"> 
                    <div class="ingredient-section"></div> 
                    <div class="pot-section"></div> 
                </div> 
            </div> 
            <div id="mixing-hall-1" class="content"> 
                <div class="mixing-hall-container"></div> 
            </div> 
            <div id="mixing-hall-2" class="content"> 
                <div class="mixing-hall-container"></div> 
            </div> 
            <div id="color-test" class="content"> 
                <div class="color-test-container"></div> 
            </div> 
            <div id="customModal" class="modal"> 
                <div class="modal-content" id="triadicColorsPopup"></div> 
            </div> 
        </section> 
    </div> 
    `;

    // Click default tab
    TabHelper.openDefaultTab();
    setTimeout(() => {
        document.body.style.visibility = "visible";
    }, 100);
    
    // Create models
    const ingredientModel = new IngredientModel();
    const potModel = new PotModel();
    const mixingMachineModel = new MixingMachineModel();
    const mixingHallModel = new MixingHallModel();
    const collectedPotsModel = new CollectedPotsModel();
    const savedPotsModel = new SavedPotsModel();

    // Initialize views
    const ingredientView = new IngredientView();
    const potView = new PotView();
    const collectedPotsView = new CollectedPotsView();
    const gridView = new GridView();
    const welcomeView = new WelcomeView();
    const helpView = new HelpView();
    const savedPotsView = new SavedPotsView();

    // Create the halls
    const mixingHallView1 = new MixingHallView(1);
    const mixingHallView2 = new MixingHallView(2);

    const savedPotsController = new SavedPotsController(
        savedPotsModel,
        savedPotsView,
        ingredientModel
    );

    // Initialize controllers
    const ingredientController = new IngredientController(ingredientModel, ingredientView);
    const potController = new PotController(
        potModel,
        potView,
        ingredientModel,
        savedPotsController
    );

    // Create a single machine controller that will manage all halls
    const machineController = new MixingMachineController(
        mixingMachineModel,
        potModel,
        ingredientModel,
        collectedPotsModel,
        savedPotsModel,
        mixingHallModel
    );

    // Register the machine views for each hall with the controller
    machineController.registerMachineView(1, mixingHallView1.getMachineView(1));
    machineController.registerMachineView(2, mixingHallView2.getMachineView(2));

    const collectedPotsController = new CollectedPotsController(
        collectedPotsModel,
        collectedPotsView,
        ingredientModel
    );

    // Initialize mixing hall controllers
    const mixingHallController1 = new MixingHallController(mixingHallModel, mixingHallView1);

    const mixingHallController2 = new MixingHallController(mixingHallModel, mixingHallView2);

    // Initial weather update
    mixingHallModel.updateWeather();
});
