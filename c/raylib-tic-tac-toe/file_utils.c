#include <stdio.h>
#include <stdlib.h>
#include "externals/cJSON.h"
#include "file_utils.h"

// Function to read a file into a string
static char* read_file(const char* filename) {
    FILE* file = fopen(filename, "rb");
    if (file == NULL) {
        perror("Error opening file");
        return NULL;
    }

    // Figure out the number of bytes in the file
    long length = get_file_length(file);

    char* data = (char*)malloc(length + 1);
    if (data == NULL) {
        perror("Memory allocation failed");
        fclose(file);
        return NULL;
    }

    size_t read_length = fread(data, 1, length, file);
    if (read_length != length) {
        perror("Error reading file");
        free(data);
        fclose(file);
        return NULL;
    }

    data[length] = '\0';
    fclose(file);
    return data;
}

// Function to read a JSON file and return a cJSON object
cJSON* read_json_file(const char* filepath) {
    char* json_data = read_file(filepath);
    if (json_data == NULL) {
        return NULL;
    }

    cJSON* json = cJSON_Parse(json_data);
    if (json == NULL) {
        const char* error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            fprintf(stderr, "Error parsing JSON: %s\n", error_ptr);
        }
        free(json_data);
        return NULL;
    }

    free(json_data);
    return json;
}

/**
 * @brief Get the length of a file.
 * 
 * @param file 
 * @return long 
 */
long get_file_length(FILE *file) {
    if (fseek(file, 0, SEEK_END) != 0) {
        perror("fseek failed");
        return -1;
    }
    long length = ftell(file);
    if (length == -1L) {
        perror("ftell failed");
        return -1;
    }
    if (fseek(file, 0, SEEK_SET) != 0) {
        perror("fseek failed");
        return -1;
    }
    return length;
}

// // Example usage
// int main() {
//     const char* filepath = "data.json";
//     cJSON* json = read_json_file(filepath);
//     if (json == NULL) {
//         fprintf(stderr, "Failed to read JSON file\n");
//         return 1;
//     }

//     // Example: Accessing data from the JSON
//     cJSON* name = cJSON_GetObjectItem(json, "name");
//     if (cJSON_IsString(name) && (name->valuestring != NULL)) {
//         printf("Name: %s\n", name->valuestring);
//     }

//     cJSON* age = cJSON_GetObjectItem(json, "age");
//     if (cJSON_IsNumber(age)) {
//         printf("Age: %d\n", age->valueint);
//     }

//     cJSON_Delete(json);
//     return 0;
// }
