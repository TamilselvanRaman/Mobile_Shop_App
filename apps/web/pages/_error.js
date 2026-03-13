function Error({ statusCode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          color: statusCode === 500 ? "#f43f5e" : "#6366f1",
          marginBottom: "1rem",
          lineHeight: 1,
        }}
      >
        {statusCode || "Error"}
      </h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        {statusCode === 404 ? "Page Not Found" : "Something Went Wrong"}
      </h2>
      <p
        style={{
          color: "#94a3b8",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        {statusCode === 404
          ? "The page you are looking for does not exist."
          : "An unexpected error occurred. Please try again."}
      </p>
      <a
        href="/"
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#4f46e5",
          color: "#fff",
          borderRadius: "9999px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go Home
      </a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
