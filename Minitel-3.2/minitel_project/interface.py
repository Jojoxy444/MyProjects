import curses
import os
import platform
import psutil
import subprocess
import json
import tarfile
from datetime import datetime
import shutil

def show_system_info(stdscr):
    stdscr.clear()
    max_y, max_x = stdscr.getmaxyx()
    row = 0

    os_version = platform.platform()
    stdscr.addstr(row, 0, f"OS Version: {os_version}")
    row += 1

    uptime_seconds = psutil.boot_time()
    uptime = subprocess.check_output('uptime -p', shell=True).decode('utf-8').strip()
    stdscr.addstr(row, 0, f"Uptime: {uptime}")
    row += 1

    kernel_version = platform.release()
    stdscr.addstr(row, 0, f"Kernel Version: {kernel_version}")
    row += 1

    cpu_info = f"CPU: {psutil.cpu_count(logical=True)} cores"
    stdscr.addstr(row, 0, cpu_info)
    row += 1

    memory_info = psutil.virtual_memory()
    memory_total = memory_info.total // (1024 ** 3)
    memory_available = memory_info.available // (1024 ** 3)
    stdscr.addstr(row, 0, f"Memory: {memory_total}GB total, {memory_available}GB available")
    row += 1

    disk_info = psutil.disk_usage('/')
    disk_total = disk_info.total // (1024 ** 3)
    disk_used = disk_info.used // (1024 ** 3)
    disk_free = disk_info.free // (1024 ** 3)
    stdscr.addstr(row, 0, f"Disk: {disk_total}GB total, {disk_used}GB used, {disk_free}GB free")
    row += 1

    file_limit = subprocess.check_output('ulimit -n', shell=True).decode('utf-8').strip()
    stdscr.addstr(row, 0, f"Open File Limit: {file_limit}")
    row += 1

    process_limit = psutil.Process().rlimit(psutil.RLIMIT_NPROC)[0]
    stdscr.addstr(row, 0, f"Process Limit: {process_limit}")
    row += 1

    stdscr.addstr(row, 0, "Press 'p' to see installed packages, any other key to return.")
    stdscr.refresh()
    key = stdscr.getch()

    if key == ord('p'):
        show_installed_packages(stdscr)
    else:
        return


def show_installed_packages(stdscr):
    stdscr.clear()
    max_y, max_x = stdscr.getmaxyx()
    row = 0

    try:
        installed_packages = subprocess.check_output(['dpkg', '-l'], text=True).splitlines()
    except Exception as e:
        stdscr.addstr(row, 0, f"Error: {e}")
        stdscr.refresh()
        stdscr.getch()
        return

    items_per_page = max_y - 2
    total_items = len(installed_packages)
    current_page = 0
    total_pages = (total_items + items_per_page - 1) // items_per_page

    while True:
        stdscr.clear()

        start_idx = current_page * items_per_page
        end_idx = min(start_idx + items_per_page, total_items)

        for i, package in enumerate(installed_packages[start_idx:end_idx]):
            stdscr.addstr(i, 0, package[:max_x])

        stdscr.addstr(max_y - 1, 0, f"Page {current_page + 1}/{total_pages} - Press 'n' for next, 'p' for previous, any other key to exit.")

        stdscr.refresh()
        key = stdscr.getch()

        if key == ord('n') and current_page < total_pages - 1:
            current_page += 1
        elif key == ord('p') and current_page > 0:
            current_page -= 1
        else:
            break


def export_info():
    """Export system information into separate JSON and YAML files, compress into tar.gz, and delete source files."""
    
    # 1. Général : Récupérer les informations système (comme dans show_system_info)
    system_info = {
        "os_version": platform.platform(),
        "uptime": subprocess.check_output('uptime -p', shell=True).decode('utf-8').strip(),
        "kernel_version": platform.release(),
        "cpu_cores": psutil.cpu_count(logical=True),
        "memory": {
            "total": psutil.virtual_memory().total // (1024 ** 3),
            "available": psutil.virtual_memory().available // (1024 ** 3),
        },
        "disk": {
            "total": psutil.disk_usage('/').total // (1024 ** 3),
            "used": psutil.disk_usage('/').used // (1024 ** 3),
            "free": psutil.disk_usage('/').free // (1024 ** 3),
        }
    }

    # 2. Réseau : Récupérer les informations réseau
    network_info = {
        "interfaces": {
            interface: [{
                "address": addr.address
            } for addr in addrs]
            for interface, addrs in psutil.net_if_addrs().items()
        },
        "packets": {
            interface: {
                "packets_sent": stats.bytes_sent,
                "packets_recv": stats.bytes_recv
            }
            for interface, stats in psutil.net_io_counters(pernic=True).items()
        },
        "ip_forwarding": 'Oui' if open('/proc/sys/net/ipv4/ip_forward').read().strip() == '1' else 'Non'
    }

    # 3. Processus : Récupérer les informations sur les processus
    processes_info = [
        {
            "pid": proc.info['pid'],
            "name": proc.info['name'],
            "username": proc.info['username'],
            "status": psutil.Process(proc.info['pid']).status(),
            "ppid": psutil.Process(proc.info['pid']).ppid(),
            "cmdline": psutil.Process(proc.info['pid']).cmdline()
        }
        for proc in psutil.process_iter(['pid', 'name', 'username'])
        if psutil.pid_exists(proc.info['pid'])
    ]

    # 4. Définir les noms des fichiers avec timestamp
    timestamp = datetime.now().strftime('%Y-%m-%d_%H:%M:%S')
    general_json = f"general_info_{timestamp}.json"
    network_json = f"network_info_{timestamp}.json"
    processes_json = f"processes_info_{timestamp}.json"

    # 5. Exporter les informations dans des fichiers JSON et YAML
    with open(general_json, 'w') as gjf:
        json.dump(system_info, gjf, indent=4)

    with open(network_json, 'w') as njf:
        json.dump(network_info, njf, indent=4)

    with open(processes_json, 'w') as pjf:
        json.dump(processes_info, pjf, indent=4)

    output_folder = "temps_files"
    if os.path.exists(output_folder):
        shutil.rmtree('./temps_files')

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Création des chemins d'accès pour les archives dans le dossier 'temps_files'
    archive_general = os.path.join(output_folder, f"general_{timestamp}.tar.gz")
    archive_network = os.path.join(output_folder, f"network_{timestamp}.tar.gz")
    archive_processes = os.path.join(output_folder, f"processes_{timestamp}.tar.gz")

    # Créer l'archive pour le fichier general_json
    with tarfile.open(archive_general, "w:gz") as tar:
        tar.add(general_json, arcname=os.path.basename(general_json))

    # Créer l'archive pour le fichier network_json
    with tarfile.open(archive_network, "w:gz") as tar:
        tar.add(network_json, arcname=os.path.basename(network_json))

    # Créer l'archive pour le fichier processes_json
    with tarfile.open(archive_processes, "w:gz") as tar:
        tar.add(processes_json, arcname=os.path.basename(processes_json))

    # 7. Supprimer les fichiers sources après compression
    os.remove(general_json)
    os.remove(network_json)
    os.remove(processes_json)

    return (archive_general, archive_network, archive_processes)

def confirm_export(stdscr):
    """Ask user for confirmation before exporting data."""
    stdscr.clear()
    stdscr.addstr(0, 0, "Are you sure you want to export system information? (y/n)")
    stdscr.refresh()
    key = stdscr.getch()

    if key == ord('y'):
        archives = export_info()
        stdscr.clear()
        stdscr.addstr(0, 0, f"System information exported to the following files:")
        stdscr.addstr(1, 0, f"- {archives[0]}")
        stdscr.addstr(2, 0, f"- {archives[1]}")
        stdscr.addstr(3, 0, f"- {archives[2]}")
        stdscr.addstr(4, 0, "Press any key to return to the menu.")
        stdscr.refresh()
        stdscr.getch()

def show_network_info(stdscr):
    stdscr.clear()
    row = 0
    max_y, max_x = stdscr.getmaxyx()  # Récupérer la taille de l'écran

    lines = []  # Liste pour stocker toutes les lignes d'information à afficher

    # Collecter les informations sur les interfaces réseau
    lines.append("Interfaces Réseau:")
    for interface, addrs in psutil.net_if_addrs().items():
        lines.append(f"Interface: {interface}")
        for addr in addrs:
            lines.append(f"  Adresse: {addr.address}")

    # Collecter les informations sur les paquets transmis/reçus
    lines.append("Paquets Transmis/Reçus:")
    for interface, stats in psutil.net_io_counters(pernic=True).items():
        lines.append(f"Interface: {interface}")
        lines.append(f"  Paquets envoyés: {stats.bytes_sent}")
        lines.append(f"  Paquets reçus: {stats.bytes_recv}")

    # Lire le statut du forwarding de paquet
    lines.append("Forwarding de paquet:")
    with open('/proc/sys/net/ipv4/ip_forward', 'r') as f:
        ip_forward = f.read().strip()
    lines.append(f"  IP Forwarding Enabled: {'Oui' if ip_forward == '1' else 'Non'}")

    # Pagination si nécessaire
    def display_lines(start_index):
        stdscr.clear()
        nonlocal row
        row = 0
        for i in range(start_index, min(start_index + max_y - 2, len(lines))):
            if row < max_y - 2:  # Assurez-vous de ne pas dépasser la taille de l'écran
                stdscr.addstr(row, 0, lines[i][:max_x])  # Tronquer la ligne si elle est trop longue
                row += 1
        
        # Vérifier s'il reste des lignes à afficher après la page actuelle
        if start_index + max_y - 2 < len(lines):
            stdscr.addstr(row, 0, "Appuyez sur 'n' pour voir plus ou une autre touche pour retourner au menu...")
        else:
            stdscr.addstr(row, 0, "Appuyez sur une touche pour revenir au menu...")

        stdscr.refresh()

    # Gestion de la navigation
    start_index = 0
    display_lines(start_index)

    while True:
        key = stdscr.getch()
        if key == ord('n'):  # 'n' pour avancer dans la pagination
            if start_index + max_y - 2 < len(lines):
                start_index += max_y - 2  # Passer à la page suivante
            else:
                start_index = 0  # Revenir au début si on atteint la fin
            display_lines(start_index)
        else:
            break

def show_processes(stdscr):
    stdscr.clear()
    row = 0
    header = "PID   Nom            Utilisateur  Statut    PPID   Commande"
    stdscr.addstr(row, 0, header)
    row += 1

    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'username']):
        try:
            p = psutil.Process(proc.info['pid'])
            processes.append({
                'pid': proc.info['pid'],
                'name': proc.info['name'],
                'username': proc.info['username'],
                'status': p.status(),
                'ppid': p.ppid(),
                'cmdline': p.cmdline()
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    def display_processes(start_index):
        nonlocal row
        stdscr.clear()
        row = 0
        stdscr.addstr(row, 0, header)
        row += 1
        max_lines = curses.LINES - 2  # Garder une ligne pour le message en bas

        for i, proc in enumerate(processes[start_index:start_index + max_lines - 1]):
            if row >= max_lines:
                break
            cmdline = " ".join(proc['cmdline']) if proc['cmdline'] else ""
            stdscr.addstr(row, 0, f"{proc['pid']:5} {proc['name'][:15]:15} {proc['username'][:10]:10} {proc['status']:10} {proc['ppid']:5} {cmdline[:curses.COLS - 40]}")
            row += 1

        # Si plus de processus à afficher, informer l'utilisateur
        if start_index + max_lines - 1 < len(processes):
            stdscr.addstr(curses.LINES - 1, 0, "Press 'p' for more processes, or 'k' to kill a process.")
        else:
            stdscr.addstr(curses.LINES - 1, 0, "Press 'k' to kill a process, or any other key to return.")
        
        stdscr.refresh()

    start_index = 0
    display_processes(start_index)

    while True:
        key = stdscr.getch()

        if key == ord('k'):
            stdscr.addstr(row + 1, 0, "Enter PID to kill:")
            stdscr.refresh()
            pid_str = ""
            while True:
                char = stdscr.getch()
                if char in (curses.KEY_ENTER, 10, 13):
                    break
                elif char == 27:  # Escape key to cancel
                    return
                elif char >= 32 and char <= 126:
                    pid_str += chr(char)
                    stdscr.addstr(row + 2, 0, f"PID: {pid_str}")
                    stdscr.refresh()

            try:
                pid = int(pid_str)
                if pid in [p['pid'] for p in processes]:
                    proc = psutil.Process(pid)
                    proc.terminate()
                    stdscr.addstr(row + 3, 0, f"Process {pid} terminated.")
                else:
                    stdscr.addstr(row + 3, 0, f"Process {pid} not found.")
            except ValueError:
                stdscr.addstr(row + 3, 0, "Invalid PID entered.")
            except psutil.NoSuchProcess:
                stdscr.addstr(row + 3, 0, f"Process {pid} does not exist.")
            except psutil.AccessDenied:
                stdscr.addstr(row + 3, 0, f"Access denied to terminate process {pid}.")
            stdscr.refresh()

        elif key == ord('p'):
            start_index += curses.LINES - 2  # Aller à la prochaine page de processus
            if start_index >= len(processes):
                start_index = 0  # Retour au début si on dépasse le nombre de processus
            display_processes(start_index)

        else:
            break

    stdscr.refresh()


def main_menu(stdscr):
    curses.curs_set(0)
    curses.start_color()  
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
    stdscr.clear()

    menu = ['Informations Générales', 'Réseau', 'Processus', 'Exporter', 'Quitter']
    current_row = 0

    while True:
        stdscr.clear()
        h, w = stdscr.getmaxyx()

        for idx, row in enumerate(menu):
            x = w//2 - len(row)//2
            y = h//2 - len(menu)//2 + idx
            if idx == current_row:
                stdscr.attron(curses.color_pair(1))
                stdscr.addstr(y, x, row)
                stdscr.attroff(curses.color_pair(1))
            else:
                stdscr.addstr(y, x, row)

        key = stdscr.getch()

        if key == curses.KEY_UP and current_row > 0:
            current_row -= 1
        elif key == curses.KEY_DOWN and current_row < len(menu) - 1:
            current_row += 1
        elif key == ord('\n'):
            if current_row == 0:
                show_system_info(stdscr)
            elif current_row == 1:
                show_network_info(stdscr)
            elif current_row == 2:
                show_processes(stdscr)
            elif current_row == 3:
                confirm_export(stdscr)
            elif current_row == 4:
                break

        stdscr.refresh()


def launch_menu():
    curses.wrapper(main_menu)
