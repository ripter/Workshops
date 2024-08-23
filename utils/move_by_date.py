import os
import shutil
import argparse
import hashlib
import datetime

def calculate_sha256(file_path):
    """Calculate the SHA-256 checksum of a file."""
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()

def move_files(src, dest):
    # Ensure source and destination directories exist
    if not os.path.exists(src):
        print(f"Source directory {src} does not exist.")
        return
    if not os.path.exists(dest):
        os.makedirs(dest)

    # Iterate over files in the source directory
    for file_name in os.listdir(src):
        file_path = os.path.join(src, file_name)
        if os.path.isfile(file_path):
            # Get the last modified date of the file
            timestamp = os.path.getmtime(file_path)
            date_modified = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
            
            # Create the date folder in the destination directory if it doesn't exist
            date_folder = os.path.join(dest, date_modified)
            if not os.path.exists(date_folder):
                os.makedirs(date_folder)
            
            # Determine the destination file path
            dest_file_path = os.path.join(date_folder, file_name)
            
            # Check if the file already exists in the destination
            if os.path.exists(dest_file_path):
                src_sha256 = calculate_sha256(file_path)
                dest_sha256 = calculate_sha256(dest_file_path)
                
                if src_sha256 == dest_sha256:
                    print(f"Duplicate found: {file_name}")
                    user_choice = input("Duplicate file found. Do you want to (m)ove or (s)kip the file? [m/s]: ").strip().lower()
                    if user_choice == 's':
                        print(f"Skipping {file_name}")
                        continue
                    elif user_choice == 'm':
                        print(f"Moving {file_name}")
                    else:
                        print("Invalid choice. Skipping file.")
                        continue
                else:
                    print(f"File with the same name but different content found: {file_name}")
                    user_choice = input("Do you want to (m)ove or (s)kip the file? [m/s]: ").strip().lower()
                    if user_choice == 's':
                        print(f"Skipping {file_name}")
                        continue
                    elif user_choice == 'm':
                        print(f"Moving {file_name}")
                    else:
                        print("Invalid choice. Skipping file.")
                        continue
            
            # Move the file to the date folder
            shutil.move(file_path, dest_file_path)
            print(f"Moved {file_name} to {date_folder}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Move files from src to dest into date-based folders based on the last modified date.')
    parser.add_argument('src', type=str, help='Source directory')
    parser.add_argument('dest', type=str, help='Destination directory')
    args = parser.parse_args()

    src_directory = args.src
    dest_directory = args.dest
    move_files(src_directory, dest_directory)
