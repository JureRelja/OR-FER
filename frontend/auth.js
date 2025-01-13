let auth0Client = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
  });
};

window.onload = async () => {
  await configureClient();

  updateUI();
};

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById("logged-out").classList.add("hidden");
    document.getElementById("logged-in").classList.remove("hidden");
  } else {
    document.getElementById("logged-out").classList.remove("hidden");
    document.getElementById("logged-in").classList.add("hidden");
  }

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0Client.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
};
