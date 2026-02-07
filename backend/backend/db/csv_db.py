import csv
import os

CSV_FILE = os.path.join(os.path.dirname(__file__), "requests.csv")

FIELDNAMES = [
    "donor_id",
    "type",
    "priority",
    "start_lon",
    "start_lat",
    "end_lon",
    "end_lat",
    "distance_km",
    "eta_min"
]


def save_rescue_request(data: dict):
    """
    Save rescue request to CSV file (safe + tolerant).
    """
    file_exists = os.path.isfile(CSV_FILE)

    with open(CSV_FILE, mode="a", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=FIELDNAMES,
            extrasaction="ignore"  
        )

        if not file_exists:
            writer.writeheader()

        writer.writerow(data)

    return True

