import os
import argparse
import datetime

def change_folder_dates(dest):
    # Iterate over folders in the destination directory
    for folder_name in os.listdir(dest):
        folder_path = os.path.join(dest, folder_name)
        if os.path.isdir(folder_path):
            try:
                # Parse the folder name as a date
                folder_date = datetime.datetime.strptime(folder_name, '%Y-%m-%d').date()
                # Convert the date to a timestamp
                folder_timestamp = datetime.datetime.combine(folder_date, datetime.datetime.min.time()).timestamp()
                # Change the modified date of the folder
                os.utime(folder_path, (folder_timestamp, folder_timestamp))
                print(f"Changed modified date of {folder_name} to {folder_date}")
            except ValueError:
                print(f"Skipping {folder_name} as it does not match the date format YYYY-MM-DD")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Change the modified date of date folders to match their date.')
    parser.add_argument('dest', type=str, help='Destination directory')
    args = parser.parse_args()

    dest_directory = args.dest
    change_folder_dates(dest_directory)
