"""Controlador SDN de ejemplo."""
import os


def apply_config(device_ip: str, config: str):
    """Aplica una configuracion al equipo. Funcion de ejemplo."""
    print(f"Aplicando configuracion a {device_ip}: {config}")
    # Aqui se podria usar paramiko/netmiko para enviar la configuracion
    # a un equipo de red. Este codigo es solo ilustrativo.


if __name__ == "__main__":
    ip = os.environ.get("DEVICE_IP", "10.0.0.1")
    apply_config(ip, "hostname SDN")
