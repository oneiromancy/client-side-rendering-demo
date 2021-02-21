// arrow function: () => {}
// arrow function is the same as function(){}

// htmlComponents is a IIFE (Immediately Invoked Function Expression)
// (function(){})(), that is, function is called right after its definition
const htmlComponents = (() => {
    const Navbar = () => {
        const el = document.createElement('div');

        el.innerHTML = `
            <nav class='navbar navbar-expand-lg navbar-light bg-light'>
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item" id="home-btn">
                            <a class="nav-link" role="button">
                                Home
                            </a>
                        </li>
                        <li class="nav-item" id="about-btn">
                            <a class="nav-link" role="button">
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;

        return el;
    };

    const HomePage = () => {
        const el = Container();

        el.innerHTML = `
            <h1>&#128075; Home page</h1>
        `;

        return el;
    };

    const AboutPage = () => {
        const el = Container();

        el.innerHTML = `
            <h1>&#128293; Nothing to see here</h1>
        `;

        return el;
    };

    const Container = () => {
        const el = document.createElement('div');
        el.style.height = '80vh';
        el.className = 'd-flex justify-content-center align-items-center';
        el.id = 'page-container';

        return el;
    };

    // htmlComponents returns an object
    return {
        Navbar,
        HomePage,
        AboutPage,
    };
})();

const handleNavBtnClicks = () => {
    const homeBtn = document.querySelector('#home-btn');
    const aboutBtn = document.querySelector('#about-btn');

    const els = [homeBtn, aboutBtn];

    // .map is similar to a for loop
    els.map((el) => {
        el.onclick = () => {
            if (el === homeBtn) {
                // changes pathname of url
                history.pushState({}, null, '/');
            }

            if (el === aboutBtn) {
                history.pushState({}, null, '/about');
            }

            syncPageState();
        };
    });
};

const syncPageState = () => {
    // clearing state of dynamic page
    const pageContainer = document.querySelector('#page-container');
    pageContainer.innerHTML = '';

    const urlPathname = window.location.pathname;

    if (urlPathname === '/about') {
        const aboutPage = htmlComponents.AboutPage();

        pageContainer.appendChild(aboutPage);
    } else {
        const homePage = htmlComponents.HomePage();

        pageContainer.appendChild(homePage);
    }
};

const renderStaticPartOfPage = () => {
    const root = document.querySelector('#root');

    const navbar = htmlComponents.Navbar();
    root.appendChild(navbar);

    const pageContainer = document.createElement('div');
    pageContainer.id = 'page-container';

    root.appendChild(pageContainer);
};

const renderDynamicPartOfPage = () => {
    handleNavBtnClicks();
    syncPageState();
};

const renderPage = () => {
    renderStaticPartOfPage();
    renderDynamicPartOfPage();
};

renderPage();
