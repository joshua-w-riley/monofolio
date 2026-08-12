let calendarEmbedLoaded = false;

export function loadCalendarEmbed() {
    if (calendarEmbedLoaded) return;
    calendarEmbedLoaded = true;

    (function (C, A, L) {
        const push = (api, args) => api.q.push(args);
        const document = C.document;

        C.Cal = C.Cal || function () {
            const cal = C.Cal;
            const args = arguments;

            if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                const script = document.createElement("script");
                script.src = A;
                script.async = true;
                document.head.appendChild(script);
                cal.loaded = true;
            }

            if (args[0] === L) {
                const namespace = args[1];
                const api = function () {
                    push(api, arguments);
                };
                api.q = api.q || [];

                if (typeof namespace === "string") {
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    push(cal.ns[namespace], args);
                    push(cal, ["initNamespace", namespace]);
                } else {
                    push(cal, args);
                }
                return;
            }

            push(cal, args);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", "30min", { origin: "https://app.cal.com" });
    Cal.ns["30min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
    });
}
