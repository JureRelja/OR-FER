let auth0Client = null;

const fetchAuthConfig = () => fetch("./auth_config.json");

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

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0Client.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    document.getElementById("logged-out").classList.add("hidden");
    document.getElementById("logged-in").classList.remove("hidden");

    document.getElementById("ipt-access-token").innerHTML =
      await auth0Client.getTokenSilently();

    document.getElementById("profilJson").textContent = JSON.stringify(
      await auth0Client.getUser()
    );
  } else {
    document.getElementById("logged-out").classList = "";
    document.getElementById("logged-in").classList = "hidden";
  }
};

const login = async () => {
  try {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  } catch (err) {
    console.error("Login failed", err);
  }
};

const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });

  window.location = "/";
};
