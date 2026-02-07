import folium


def generate_route_map(start, end, geometry, output_file="route_map.html"):
    """
    start = (lat, lon)
    end   = (lat, lon)
    geometry = GeoJSON coordinates from OSRM
    """

    # Center map
    center_lat = (start[0] + end[0]) / 2
    center_lon = (start[1] + end[1]) / 2

    m = folium.Map(location=[center_lat, center_lon], zoom_start=12)

    # Start marker
    folium.Marker(
        location=start,
        popup="Start",
        icon=folium.Icon(color="green")
    ).add_to(m)

    # End marker
    folium.Marker(
        location=end,
        popup="Destination",
        icon=folium.Icon(color="red")
    ).add_to(m)

    # Route polyline
    if geometry:
        coords = [(lat, lon) for lon, lat in geometry["coordinates"]]
        folium.PolyLine(coords, color="blue", weight=5).add_to(m)

    # Save HTML
    m.save(output_file)

    return output_file

